import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api"; // Assuming you have a baseQueryWithReauth for re-authentication handling

export const apiCommission = createApi({
  reducerPath: "apiCommission",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // Commissions APIs
    getAllCommissions: builder.query({
      query: () => "commissions/", 
    }),
    createCommission: builder.mutation({
      query: (data) => ({
        url: "commissions/", 
        method: "POST",
        body: data, 
      }),
    }),
  }),
});

export const {
  // Commissions
  useGetAllCommissionsQuery,
  useCreateCommissionMutation,
} = apiCommission;
