// transaction.schema.ts
import mongoose from "mongoose";
import { type ITransaction } from "./transaction.dto";

const Schema = mongoose.Schema;

const TransactionSchema = new Schema<ITransaction>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: false,default:null },
    amount: { type: Number, required: true },
    type: { type: String, enum: ["DEPOSIT", "TRANSFER", "WITHDRAWAL"], required: true },
    status: { type: String, enum: ["PENDING", "APPROVED", "REJECTED"], required: true, default: "PENDING" },
    isInternational: { type: Boolean, required: true },
    commissionAmount: { type: Number, required: false }
}, { timestamps: true });

export default mongoose.model<ITransaction>("transaction", TransactionSchema);
