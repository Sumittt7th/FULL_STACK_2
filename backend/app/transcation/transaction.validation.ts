import { body } from "express-validator";

export const createTransaction = [
  body("amount").notEmpty().withMessage("amount is required").isNumeric().withMessage("amount must be a number"),
];

export const updateTransaction = [
  body("status").optional().isIn(["PENDING", "APPROVED", "REJECTED"]).withMessage("Invalid status"),
];
