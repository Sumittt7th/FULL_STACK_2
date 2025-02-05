import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const apiUser = createApi({
  reducerPath: "apiUser",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // Users APIs
    getAllUsers: builder.query({
      query: () => "users/",
    }),
    getUserById: builder.query({
      query: (id) => `users/${id}`,
    }),
    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    editUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `users/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `users/${id}`,
        method: "DELETE",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "users/logout",
        method: "POST",
      }),
    }),
    changePassword: builder.mutation({
      query: ({ id, currentPassword, newPassword }) => ({
        url: `users/changePassword/${id}`,
        method: "POST",
        body: { currentPassword, newPassword },
      }),
    }),
  }),
});

export const {
  // Users
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useEditUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useLogoutMutation,
  useChangePasswordMutation,
} = apiUser;
