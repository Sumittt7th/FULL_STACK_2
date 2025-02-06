import express from "express";
import userRoutes from "./user/user.route";
import transRoutes from "./transcation/transaction.route"
import approvalRoutes from "./approval/approval.route";
import swaggerUi from "swagger-ui-express";
const swaggerDocument = require("../swagger/swagger_output.json");

// routes
const router = express.Router();

router.use("/users", userRoutes);
router.use("/transactions",transRoutes);
router.use("/approvals",approvalRoutes);
router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;