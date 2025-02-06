import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "./reducers/authReducer";
import { apiAuth } from "../services/auth.api";
import { apiUser } from "../services/user.api";
import { apiTransaction } from '../services/transaction.api';
import { apiApproval } from '../services/approval.api';
import { apiCommission } from '../services/commisions.api';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiAuth.reducerPath]: apiAuth.reducer,
    [apiUser.reducerPath]: apiUser.reducer,
    [apiTransaction.reducerPath]: apiTransaction.reducer,
    [apiApproval.reducerPath]: apiApproval.reducer,
    [apiCommission.reducerPath]: apiCommission.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiAuth.middleware,apiUser.middleware,apiTransaction.middleware,apiApproval.middleware,apiCommission.middleware),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
