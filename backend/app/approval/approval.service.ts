import ApprovalModel from "./approval.schema";
import { IApproval } from "./approval.dto";
import UserModel from "../user/user.schema"

/**
 * Creates a new approval record.
 */
export const createApproval = async (data: IApproval) => {
  return await ApprovalModel.create(data);
};

/**
 * Gets all approvals.
 */
export const getAllApprovals = async () => {
  const result =  await ApprovalModel.find().populate("userId").populate("txnId").sort({ createdAt: -1 }).lean();
  return result;
  
};

/**
 * Gets an approval by ID.
 */
export const getApprovalById = async (id: string) => {
  return await ApprovalModel.findById(id).lean();
};

/**
 * Updates an approval by ID.
 */
export const updateApproval = async (id: string, data: Partial<IApproval>) => {
  return await ApprovalModel.findByIdAndUpdate(id, data, { new: true });
};

/**
 * Deletes an approval by ID.
 */
export const deleteApproval = async (id: string) => {
  return await ApprovalModel.findByIdAndDelete(id);
};

export const checkUserBalance = async (userId: string, totalAmount: number) => {
  // Find the user by ID
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }
  return user.walletBalance >= totalAmount;
};
