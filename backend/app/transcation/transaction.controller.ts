import * as transactionService from "./transaction.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";
import createHttpError from "http-errors";
import { type ITransaction } from "./transaction.dto";

/**
 * Creates a new transaction.
 */
export const createTransaction = asyncHandler(async (req: Request, res: Response) => {
  const result = await transactionService.createTransaction(req.body);
  res.send(createResponse(result, "Transaction created successfully"));
});

/**
 * Gets all transactions.
 */
export const getAllTransactions = asyncHandler(async (req: Request, res: Response) => {
  const userId = req?.user?._id;
  if(userId){
  const result = await transactionService.getAllTransactions(userId);
  res.send(createResponse(result, "Transactions fetched successfully"));
  }
});

/**
 * Gets a single transaction by ID.
 */
export const getTransactionById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await transactionService.getTransactionById(id);
  if (!result) throw createHttpError(404, "Transaction not found");
  res.send(createResponse(result, "Transaction fetched successfully"));
});

/**
 * Updates a transaction by ID.
 */
export const updateTransaction = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    console.log({status})
    if (!status) {
      throw createHttpError(400, "Invalid status provided");
    }
  
    const result = await transactionService.updateTransaction(id, req.body);
  
    if (status === 'APPROVED') {
      res.send(createResponse(result, "Transaction approved and commission applied"));
    } else {
      res.send(createResponse(result, "Transaction rejected"));
    }
  });

/**
 * Deletes a transaction by ID.
 */
export const deleteTransaction = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await transactionService.deleteTransaction(id);
  res.send(createResponse(null, "Transaction deleted successfully"));
});
