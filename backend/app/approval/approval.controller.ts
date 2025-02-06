import * as approvalService from "./approval.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import createHttpError from "http-errors";
import TransactionModel from "../transcation/transaction.schema"
import { isNull } from 'node:util';

/**
 * Creates a new approval record.
 */
export const createApproval = asyncHandler(async (req: Request, res: Response) => {
  const result = await approvalService.createApproval(req.body);
  res.send(createResponse(result, "Approval created successfully"));
});

/**
 * Gets all approvals.
 */
export const getAllApprovals = asyncHandler(async (req: Request, res: Response) => {
  const result = await approvalService.getAllApprovals();
  res.send(createResponse(result, "Approvals fetched successfully"));
});

/**
 * Gets a single approval by ID.
 */
export const getApprovalById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await approvalService.getApprovalById(id);
  if (!result) throw createHttpError(404, "Approval not found");
  res.send(createResponse(result, "Approval fetched successfully"));
});

/**
 * Updates an approval by ID.
 */
export const updateApproval = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await approvalService.updateApproval(id, req.body);
  res.send(createResponse(result, "Approval updated successfully"));
}); 

/**
 * Deletes an approval by ID.
 */
export const deleteApproval = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await approvalService.deleteApproval(id);
  res.send(createResponse(null, "Approval deleted successfully"));
});

export const checkBalanceController = async (req: Request, res: Response) => {
  try {
    const { userId, txnId } = req.body;

    // Fetch the transaction using txnId
    const transaction = await TransactionModel.findById(txnId);

    if (!transaction) {
      return res.status(404).json(createResponse(false, "Transaction not found"));
    }

    // Calculate the total amount with commission
    const totalAmount =
      transaction.amount + (transaction.isInternational ? 10 : 5); 

    // Call the service to check balance
    const hasSufficientBalance = await approvalService.checkUserBalance(userId, totalAmount);

    if (!hasSufficientBalance) {
      return res.send(createResponse(false, "Insufficient balance")); 
    }

    return res.send(createResponse(true, "Sufficient balance")); 
  } catch (error) {
    console.error(error);
    return res.send(createResponse(false, "Server error"));
  }
};
