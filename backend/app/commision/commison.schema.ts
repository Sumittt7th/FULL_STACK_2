import mongoose from "mongoose";
import { ICommission } from "./commision.dto";

const Schema = mongoose.Schema;

const CommissionSchema = new Schema<ICommission>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    transactionId: { type: mongoose.Schema.Types.ObjectId, ref: "transaction", required: true },
    commissionAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ICommission>("Commission", CommissionSchema);