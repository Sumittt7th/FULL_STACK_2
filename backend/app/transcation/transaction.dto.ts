import { ObjectId } from 'mongoose';
import { type BaseSchema } from "../common/dto/base.dto";

export interface ITransaction extends BaseSchema {
    userId: string | ObjectId; 
    receiverId?: string | ObjectId; 
    amount: number;
    type: "DEPOSIT" | "TRANSFER" | "WITHDRAWAL";
    status: "PENDING" | "APPROVED" | "REJECTED";
    isInternational: boolean; 
    commissionAmount: number;
}
