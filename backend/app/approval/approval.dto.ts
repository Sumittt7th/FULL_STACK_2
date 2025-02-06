import { ObjectId } from 'mongoose';
import { BaseSchema } from "../common/dto/base.dto";

export interface IApproval extends BaseSchema {
  txnId: string | ObjectId; 
  userId: string | ObjectId; 
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}
