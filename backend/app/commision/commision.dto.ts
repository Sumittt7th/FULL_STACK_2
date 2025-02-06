import { ObjectId } from 'mongoose';
import { BaseSchema } from "../common/dto/base.dto";

export interface ICommission extends BaseSchema {
  userId: string | ObjectId;
  transactionId: string | ObjectId;
  commissionAmount: number;
}

