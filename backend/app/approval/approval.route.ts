import { Router } from "express";
import * as approvalController from "./approval.controller";
import { catchError } from "../common/middleware/cath-error.middleware";
import { isAuthenticated } from "../common/middleware/isAuthenticate.middleware";
import { roleAuth } from "../common/middleware/role-auth.middleware";

const router = Router();

router
  .get("/", isAuthenticated, roleAuth("ADMIN"), approvalController.getAllApprovals)
  .get("/:id", isAuthenticated, approvalController.getApprovalById)
  .post("/", isAuthenticated, catchError, approvalController.createApproval)
  .put("/:id", isAuthenticated, roleAuth("ADMIN"), catchError, approvalController.updateApproval)
  .delete("/:id", isAuthenticated, roleAuth("ADMIN"), approvalController.deleteApproval)
  .post("/check",isAuthenticated,roleAuth("ADMIN"),approvalController.checkBalanceController);

export default router;
