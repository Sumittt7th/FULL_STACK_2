import CommissionModel from "./commison.schema";
import { ICommission } from "./commision.dto";


/**
 * Creates a new commission record.
 */
export const createCommission = async (data: ICommission) => {
    
  return await CommissionModel.create(data);
};

/**
 * Gets all commissions.
 */
export const getAllCommissions = async () => {
  const result = await CommissionModel.find().populate("userId").populate("txnId").sort({ createdAt: -1 }).lean();
  return result;
};
