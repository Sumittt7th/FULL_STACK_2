import { Router } from "express";
import * as commisionController from "./commision.controller";
import { catchError } from "../common/middleware/cath-error.middleware";
import { isAuthenticated } from "../common/middleware/isAuthenticate.middleware";
import { roleAuth } from "../common/middleware/role-auth.middleware";

const router = Router();

router
  .post("/", isAuthenticated, catchError,commisionController.createCommission)
  .get('/',isAuthenticated,roleAuth("ADMIN"),catchError, commisionController.getAllCommissions);
  
export default router;
