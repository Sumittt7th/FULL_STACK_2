import * as commissionService from "./commison.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import createHttpError from "http-errors";

/**
 * Creates a new commission record.
 */
export const createCommission = asyncHandler(async (req: Request, res: Response) => {
    console.log(req.body)
  const result = await commissionService.createCommission(req.body);
  res.send(createResponse(result, "Commission created successfully"));
});

/**
 * Gets all commissions.
 */
export const getAllCommissions = asyncHandler(async (req: Request, res: Response) => {
  const result = await commissionService.getAllCommissions();
  res.send(createResponse(result, "Commissions fetched successfully"));
});
