import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const apiTransaction = createApi({
  reducerPath: "apiTransaction",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // Transactions APIs
    getAllTransactions: builder.query({
      query: () => "transactions/",
    }),
    getTransactionById: builder.query({
      query: (id) => `transactions/${id}`,
    }),
    createTransaction: builder.mutation({
      query: (data) => ({
        url: "transactions/",
        method: "POST",
        body: data,
      }),
    }),
    updateTransaction: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `transactions/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteTransaction: builder.mutation({
      query: ({ id }) => ({
        url: `transactions/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  // Transactions
  useGetAllTransactionsQuery,
  useGetTransactionByIdQuery,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} = apiTransaction;
