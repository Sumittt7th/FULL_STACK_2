import { ObjectId } from 'mongoose';
import { BaseSchema } from "../common/dto/base.dto";

export interface ICommission extends BaseSchema {
  userId: string | ObjectId;
  txnId: string | ObjectId;
  commissionAmount: number;
}

