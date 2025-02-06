import { Router } from "express";
import * as transactionController from "./transaction.controller";
import * as transactionValidator from "./transaction.validation";
import { catchError } from "../common/middleware/cath-error.middleware";
import { isAuthenticated } from "../common/middleware/isAuthenticate.middleware";
import { roleAuth } from "../common/middleware/role-auth.middleware";

const router = Router();

router
  .get("/", isAuthenticated, transactionController.getAllTransactions)
  .get("/:id", isAuthenticated, transactionController.getTransactionById)
  .post("/", isAuthenticated, transactionValidator.createTransaction, catchError, transactionController.createTransaction)
  .put("/:id", isAuthenticated, roleAuth("ADMIN"), transactionValidator.updateTransaction, catchError, transactionController.updateTransaction)
  .delete("/:id", isAuthenticated, roleAuth("ADMIN"), transactionController.deleteTransaction);

export default router;
