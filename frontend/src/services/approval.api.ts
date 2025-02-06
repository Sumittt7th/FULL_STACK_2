import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const apiApproval = createApi({
  reducerPath: "apiApproval",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // Approvals APIs
    getAllApprovals: builder.query({
      query: () => "approvals/",
    }),
    getApprovalById: builder.query({
      query: (id) => `approvals/${id}`,
    }),
    createApproval: builder.mutation({
      query: (data) => ({
        url: "approvals/",
        method: "POST",
        body: data,
      }),
    }),
    updateApproval: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `approvals/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteApproval: builder.mutation({
      query: ({ id }) => ({
        url: `approvals/${id}`,
        method: "DELETE",
      }),
    }),
    checkBalance: builder.mutation({
        query: (data) => ({
          url: "approvals/check", // The backend route to check balance
          method: "POST",
          body: data, // Sending userId and txnId in request body
        }),
      }),
  }),
});

export const {
  // Approvals
  useGetAllApprovalsQuery,
  useGetApprovalByIdQuery,
  useCreateApprovalMutation,
  useUpdateApprovalMutation,
  useDeleteApprovalMutation,
  useCheckBalanceMutation,
} = apiApproval;
