import mongoose from "mongoose";
import { IApproval } from "./approval.dto";

const Schema = mongoose.Schema;

const ApprovalSchema = new Schema<IApproval>(
  {
    txnId: { type: mongoose.Schema.Types.ObjectId, ref: "transaction", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    status: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED'], default: 'PENDING' },
  },
  { timestamps: true }
);

export default mongoose.model<IApproval>("Approval", ApprovalSchema);
