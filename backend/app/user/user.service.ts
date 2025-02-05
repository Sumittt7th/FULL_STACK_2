import { createUserTokens, decodeToken } from '../common/services/passport-jwt.service';
import * as mailService from "../common/services/email.service"
import { type IUser } from "./user.dto";
import UserSchema from "./user.schema";
import userSchema from './user.schema';
import bcrypt from 'bcrypt';

/**
 * Creates a new user with the specified data.
 * @async
 * @function createUser
 * @param {IUser} data - User data to create a new user.
 * @returns {Promise<Object>} The created user document.
 */
export const createUser = async (data: IUser) => {
    const result = await UserSchema.create({ ...data, active: true, refToken: "" });
    return result;
};

/**
 * Updates an existing user by ID with the provided data.
 * @async
 * @function updateUser
 * @param {string} id - The ID of the user to update.
 * @param {IUser} data - Updated user data.
 * @returns {Promise<Object|null>} The updated user document or null if not found.
 */
export const updateUser = async (id: string, data: IUser) => {
    const result = await UserSchema.findOneAndUpdate({ _id: id }, data, {
        new: true,
    });
    return result;
};

/**
 * Partially updates an existing user by ID with the provided data.
 * @async
 * @function editUser
 * @param {string} id - The ID of the user to edit.
 * @param {Partial<IUser>} data - Partial user data for the update.
 * @returns {Promise<Object|null>} The updated user document or null if not found.
 */
export const editUser = async (id: string, data: Partial<IUser>) => {
    const result = await UserSchema.findOneAndUpdate({ _id: id }, data);
    return result;
};

/**
 * Deletes a user by their ID.
 * @async
 * @function deleteUser
 * @param {string} id - The ID of the user to delete.
 * @returns {Promise<Object>} The result of the delete operation.
 */
export const deleteUser = async (id: string) => {
    const result = await UserSchema.deleteOne({ _id: id });
    return result;
};

/**
 * Retrieves a user by their ID.
 * @async
 * @function getUserById
 * @param {string} id - The ID of the user to retrieve.
 * @returns {Promise<Object|null>} The user document or null if not found.
 */
export const getUserById = async (id: string) => {
    const result = await UserSchema.findById(id).lean();
    return result;
};

/**
 * Retrieves all users.
 * @async
 * @function getAllUser
 * @returns {Promise<Array<Object>>} An array of all user documents.
 */
export const getAllUser = async () => {
    const result = await UserSchema.find({}).lean();
    return result;
};

/**
 * Retrieves a user by their email.
 * @async
 * @function getUserByEmail
 * @param {string} email - The email of the user to retrieve.
 * @returns {Promise<Object|null>} The user document or null if not found.
 */
export const getUserByEmail = async (email: string) => {
    const result = await UserSchema.findOne({ email }).lean();
    return result;
};



/**
 * Logs out a user by removing their refresh token from the database.
 * 
 * @async
 * @function
 * @param {string} userId - The ID of the user to log out.
 * @throws {Error} Throws an error if the user is not found in the database.
 * @returns {Promise<void>} A promise indicating the completion of the logout process.
 */
export const logoutUser = async (userId:string) => {
    const fetchUser = await UserSchema.findById(userId);

    if (!fetchUser) {
        throw new Error("User not found");
    }
    // Remove the refreshToken from the user document
    fetchUser.refToken = "";

    await fetchUser.save();

    return;
};

/**
 * Refreshes the access token using the refresh token.
 * 
 * @param {string} refreshToken - The refresh token.
 * @returns {Object} - The new access token and refresh token.
 * @throws {Error} - Throws an error if the refresh token is invalid or expired.
 */
export const refreshToken = async (refsToken: string) => {
      const decoded: any = decodeToken(refsToken)  
    
      const user = await UserSchema.findById(decoded._id).lean();
      if (!user) {
        throw new Error('User not found');
      }
     
      const { accessToken, refreshToken } = createUserTokens(user);
      await editUser(user._id, {refToken: refreshToken });
      console.log({accessToken,refreshToken})
  
      return { accessToken, refreshToken};  
   
  };

/**
 * Sends a password reset email to the specified user.
 *
 * @async
 * @function forgotPassword
 * @param {string} email - The email address of the user requesting a password reset.
 * @throws {Error} If the user does not exist or is unauthorized.
 * @returns {Promise<void>} Resolves when the email has been sent successfully.
 * @example
 * forgotPassword("user@example.com");
 * // Sends an email with a reset password link.
 */
  export const forgotPassword = async (email: string) => {

    const user = await UserSchema.findOne({ email }).lean();
    console.log(user);

    if (!user) {
        throw new Error("Invalid or unauthorized user role");
    }

    const { accessToken } = await createUserTokens(user);
    const resetURL = `${process.env.FE_BASE_URL}/reset-password?token=${accessToken}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset Request",
        text: `You requested a password reset. Click the link to reset your password: ${resetURL}`,
    };

    await mailService.sendEmail(mailOptions);
};

/**
 * Resets the user's password by updating it with a new hashed password.
 *
 * @async
 * @function resetPassword
 * @param {string} id - The unique identifier of the user whose password is to be reset.
 * @param {string} newPassword - The new password to be set for the user.
 * @throws {Error} If the user does not exist or is unauthorized.
 * @returns {Promise<Object>} The updated user object after the password reset.
 * @example
 * resetPassword("64abc123456def789ghi012", "newSecurePassword");
 * // Updates the user's password and returns the updated user object.
 */
export const resetPassword = async (id: string, newPassword: string) => {

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const updatedUser = await userSchema.findOneAndUpdate(
        { _id: id }, 
        { password: hashedPassword },
        { new: true } 
    );

    // If the user doesn't exist, throw an error
    if (!updatedUser) {
        throw new Error("User not found or unauthorized.");
    }

    return updatedUser;

}

/**
 * @function changePassword
 * @description Changes the password of a user by validating the current password and updating it with the new one.
 * @param {string} id - The unique ID of the user whose password is to be changed.
 * @param {string} currentPassword - The current password of the user to validate.
 * @param {string} newPassword - The new password to set for the user.
 * @throws {Error} Throws an error if the user is not found, the current password is invalid, or the update fails.
 * @returns {Promise<Object>} Returns the updated user object after the password change.
 */
export const changePassword = async (id: string, currentPassword:string,newPassword: string) => {
  // Hash the new password
  const user = await userSchema.findById(id).lean();
  if (!user) {
    throw new Error("User not found.");
  }
  const isMatch = await bcrypt.compare(currentPassword, user.password);

  if (!isMatch) {
    throw new Error("Invalid old password.");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);
  const updatedUser = await userSchema.findOneAndUpdate(
    { _id: id },
    { password: hashedPassword },
    { new: true }
  );

  // If the user doesn't exist, throw an error
  if (!updatedUser) {
    throw new Error("User not found or unauthorized.");
  }

  return updatedUser;
};


