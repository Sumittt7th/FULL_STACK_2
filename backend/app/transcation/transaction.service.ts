import TransactionModel from "./transaction.schema";
import { type ITransaction } from "./transaction.dto";
import UserModel from "../user/user.schema"
import createHttpError from 'http-errors';

// Commission constants
const LOCAL_COMMISSION = 5;  
const INTERNATIONAL_COMMISSION = 10; 

/**
 * Creates a new transaction.
 */
export const createTransaction = async (data: ITransaction) => {
  const result = await TransactionModel.create(data);
  return result;
};

/**
 * Gets all transactions.
 */
export const getAllTransactions = async (userId: string) => {
  return await TransactionModel.find({
    $or: [{ userId }, { receiverId: userId }]
  })
  .populate("userId") // Populate sender details
  .populate("receiverId") // Populate receiver details
  .sort({ createdAt: -1 })
  .lean();
};
/**
 * Gets a transaction by ID.
 */
export const getTransactionById = async (id: string) => {
  return await TransactionModel.findById(id).lean();
};

/**
 * Updates a transaction by ID.
 */
export const updateTransaction = async (id: string, data: Partial<ITransaction>) => {
  const transaction = await TransactionModel.findById(id);
  
  if (!transaction) throw createHttpError(404, "Transaction not found");

  // Check if the transaction is being approved
  if (data.status && data.status === 'APPROVED') {
    let commissionAmount = 0;

    // Only calculate commission if it's not a deposit
    if (transaction.type !== 'DEPOSIT') {
      commissionAmount = transaction.isInternational ? INTERNATIONAL_COMMISSION : LOCAL_COMMISSION;
      transaction.commissionAmount = commissionAmount; 
    }

    const sender = await UserModel.findById(transaction.userId);
    if (!sender) throw createHttpError(404, "Sender not found");

    if (transaction.type !== 'DEPOSIT') {
      sender.walletBalance -= (transaction.amount + commissionAmount);
    } else {
      sender.walletBalance += transaction.amount;
    }
    await sender.save();

    // If it's a transfer, update the receiver's wallet balance
    if (transaction.type === 'TRANSFER' && transaction.receiverId) {
      const receiver = await UserModel.findById(transaction.receiverId);
      if (!receiver) throw createHttpError(404, "Receiver not found");

      receiver.walletBalance += transaction.amount;   
      await receiver.save();
    }

    await transaction.save(); 
  }

  // Update the transaction in the database and return the updated transaction
  return await TransactionModel.findByIdAndUpdate(id, data, { new: true });
};

/**
 * Deletes a transaction by ID.
 */
export const deleteTransaction = async (id: string) => {
  return await TransactionModel.findByIdAndDelete(id);
};
