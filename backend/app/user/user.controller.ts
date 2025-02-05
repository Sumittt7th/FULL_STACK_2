import * as userService from "./user.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";
import passport from "passport";
import { createUserTokens, decodeToken } from "../common/services/passport-jwt.service";
import createHttpError from 'http-errors';
import { type IUser } from "./user.dto";

/**
 * Creates a new user with the provided details.
 *
 * @async
 * @function createUser
 * @param {Request} req - The HTTP request object containing user details in the body.
 * @param {Response} res - The HTTP response object to send the result.
 * @throws {Error} If user creation fails due to validation errors or other issues.
 * @example
 * // POST request body: { name: "John Doe", email: "john@example.com", password: "securePass123" }
 * createUser(req, res);
 * // Response: { message: "User created successfully", data: { id: "123", name: "John Doe", email: "john@example.com" } }
 */


export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.createUser(req.body);
  res.send(createResponse(result, "User created sucssefully"));
});

/**
 * Updates an existing user with the provided details.
 *
 * @async
 * @function updateUser
 * @param {Request} req - The HTTP request object containing the user ID in params and updated details in the body.
 * @param {Response} res - The HTTP response object to send the result.
 * @throws {Error} If the user ID is invalid or the update operation fails.
 * @example
 * // PUT request to /users/123 with body: { name: "Jane Doe", email: "jane@example.com" }
 * updateUser(req, res);
 * // Response: { message: "User updated successfully", data: { id: "123", name: "Jane Doe", email: "jane@example.com" } }
 */


export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.updateUser(req.params.id, req.body);
  res.send(createResponse(result, "User updated sucssefully"));
});

/**
 * Edits specific user details such as name and email.
 *
 * @async
 * @function editUser
 * @param {Request} req - The HTTP request object containing the user ID in params and the updated name and email in the body.
 * @param {Response} res - The HTTP response object to send the result.
 * @throws {Error} If the user ID is invalid or the update operation fails.
 * @example
 * // PATCH request to /users/123 with body: { name: "Jane Doe", email: "jane@example.com" }
 * editUser(req, res);
 * // Response: { message: "User updated successfully", data: { id: "123", name: "Jane Doe", email: "jane@example.com" } }
 */


export const editUser = asyncHandler(async (req: Request, res: Response) => {
  const {name,email} = req.body;
  const result = await userService.editUser(req.params.id, {
    name:name,email:email,
  });
  res.send(createResponse(result, "User updated sucssefully"));
});

/**
 * Deletes a user by their ID.
 *
 * @async
 * @function deleteUser
 * @param {Request} req - The HTTP request object containing the user ID in params.
 * @param {Response} res - The HTTP response object to send the result.
 * @throws {Error} If the user ID is invalid or the deletion operation fails.
 * @example
 * // DELETE request to /users/123
 * deleteUser(req, res);
 * // Response: { message: "User deleted successfully" }
 */


export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.deleteUser(req.params.id);
  res.send(createResponse(result, "User deleted sucssefully"));
});

/**
 * Retrieves a user by their ID.
 *
 * @async
 * @function getUserById
 * @param {Request} req - The HTTP request object containing the user ID in params.
 * @param {Response} res - The HTTP response object to send the user data.
 * @throws {Error} If the user ID is invalid or the user is not found.
 * @example
 * // GET request to /users/123
 * getUserById(req, res);
 * // Response: { data: { id: "123", name: "John Doe", email: "john@example.com" } }
 */


export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.getUserById(req.params.id);
  res.send(createResponse(result));
});

/**
 * Retrieves a list of all users.
 *
 * @async
 * @function getAllUser
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object to send the list of users.
 * @throws {Error} If fetching users fails.
 * @example
 * // GET request to /users
 * getAllUser(req, res);
 * // Response: { data: [{ id: "123", name: "John Doe", email: "john@example.com" }, { id: "124", name: "Jane Doe", email: "jane@example.com" }] }
 */


export const getAllUser = asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.getAllUser();
  res.send(createResponse(result));
});

/**
 * Authenticates a user using Passport.js and issues access and refresh tokens.
 *
 * @async
 * @function loginUser
 * @param {Request} req - The HTTP request object containing user credentials in the body.
 * @param {Response} res - The HTTP response object to send the authentication result.
 * @throws {Error} If authentication fails due to incorrect credentials or other issues.
 * @example
 * // POST request body: { email: "john@example.com", password: "securePass123" }
 * loginUser(req, res);
 * // Response: { message: "Login successful", data: { accessToken: "eyJhbGci...", refreshToken: "eyJhbGci...", role: "user", user: { id: "123", name: "John Doe", email: "john@example.com" } } }
 */


export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  passport.authenticate(
    "login",
    async (err: Error | null, user: any | undefined, info: any) => {
      if (err || !user) {
        return res.status(401).json({
          message: info?.message || "Authentication failed",
        });
      }
      

      const { accessToken, refreshToken } = createUserTokens(user);
      await userService.editUser(user._id, {refToken: refreshToken });

      res.send(
        createResponse({ accessToken, refreshToken, role:user.role, user }, "Login successful")
      );
    }
  )(req, res);
});


/**
 * Logs out a user by clearing their refresh token.
 *
 * @async
 * @function logoutUser
 * @param {Request} req - The HTTP request object, containing the authenticated user.
 * @param {Response} res - The HTTP response object to send the logout confirmation.
 * @throws {Error} If the user is not authenticated or unauthorized.
 * @example
 * // POST request to /logout (with user authenticated)
 * logoutUser(req, res);
 * // Response: { message: "User logout successfully" }
 */

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  if(!req.user){
      throw createHttpError(403, {
          message: "Invalid or unauthorized user role",
      });
  }

  await userService.editUser(req.user._id, { refToken: "" });
  res.send(createResponse("User logout successfully"))
});

/**
 * Refreshes the user's access token using a valid refresh token.
 *
 * @async
 * @function refreshToken
 * @param {Request} req - The HTTP request object containing the refresh token in the Authorization header.
 * @param {Response} res - The HTTP response object to send the new access token.
 * @throws {Error} If the refresh token is missing, invalid, or expired.
 * @example
 * // POST request with header: Authorization: Bearer <refresh_token>
 * refreshToken(req, res);
 * // Response: { message: "Token generated", data: { accessToken: "newAccessToken123" } }
 */

export const refreshToken = asyncHandler(async (req: Request, res: Response ) => {
  const refToken  = req.headers.authorization?.replace("Bearer ", "");

  if (refToken) {
    const result = await userService.refreshToken(refToken as string);
    console.log("Result",result);
    res.send(createResponse(result,"Token generated "));
  }
  else{
    res.send(createResponse(null,"Token not generated "));
  }
  
});

/**
 * Sends a password reset link to the user's email address.
 *
 * @async
 * @function forgotPassword
 * @param {Request} req - The HTTP request object containing the user's email in the body.
 * @param {Response} res - The HTTP response object to send the result.
 * @throws {Error} If the email is invalid or the user does not exist.
 * @example
 * // POST request body: { email: "user@example.com" }
 * forgotPassword(req, res);
 * // Response: { message: "Password reset link sent to your email" }
 */

export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  await userService.forgotPassword(email);

  res.send(createResponse("Password reset link sent to your email" ));
});


/**
 * Resets the user's password using a provided token and new password.
 *
 * @async
 * @function resetPassword
 * @param {Request} req - The HTTP request object containing the token and new password in the body.
 * @param {Response} res - The HTTP response object to send the result.
 * @throws {Error} If the token is invalid, expired, or the user cannot be found.
 * @example
 * // POST request body: { token: "eyJhbGci...", password: "newSecurePassword" }
 * resetPassword(req, res);
 * // Response: { message: "Password successfully reset" }
 */
export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
 
  const { token,password } = req.body;  
  
  const decodedUser: any = await decodeToken(token);

  await userService.resetPassword(decodedUser._id, password);

  res.send(createResponse("Password successfully reset" ));
});

/**
 * @function changePassword
 * @description Handles the password change request by validating the user's credentials and updating the password.
 * @param {Request} req - The request object containing the user details and password change information.
 * @param {Response} res - The response object used to send back the success message.
 * @throws {Error} Throws an error if password change fails (e.g., invalid current password or user not found).
 * @returns {void} Sends a response to indicate the success of the password change.
 */
export const changePassword = asyncHandler(async (req: Request, res: Response) => {
  const {id} = req.params;
  const { currentPassword,newPassword } = req.body;  

  await userService.changePassword(id, currentPassword,newPassword);

  res.send(createResponse("Password successfully changed" ));
});



