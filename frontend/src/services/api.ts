import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";
import {
  logout,
  resetTokens,
  setTokens,
} from "../store/reducers/authReducer";



export interface UserResponse {
  data: {
    user: {
      _id: string;
      name: string;
      email: string;
      password: string;
      role: string;
    };
    accessToken: string;
    refreshToken: string;
  };
}

export const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/",
  prepareHeaders: (headers, { getState, endpoint }) => {
    const state = getState() as RootState;

    const token = state.auth.accessToken; // Get accessToken from your Redux states

    // List of public endpoints where no token is required
    const publicEndpoints = [
      "users/",
      "users/login",
      "users/forgotPassword",
      "users/reset-password",
    ]; // Add other public endpoints here
    if (!publicEndpoints.includes(endpoint) && token) {
      // Attach the token only for private endpoints
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Access token expired, attempt to refresh
    const state = api.getState() as RootState;
    const refreshToken = state.auth.refreshToken;

    if (refreshToken) {
      // Attempt token refresh
      const refreshResult = await baseQuery(
        {
          url: "users/reftoken",
          method: "POST",
          headers: {
            Authorization: `Bearer ${refreshToken}`, // Send the refresh token as Bearer
          },
        },
        api,
        extraOptions
      );


      if (refreshResult) {
        // Save new tokens in Redux state
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          refreshResult?.data.data as {
            accessToken: string;
            refreshToken: string;
          };
        api.dispatch(
          setTokens({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            role:state.auth.role,
            user:state.auth.user,
          })
        );

        // Retry the original request with the new access token
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Refresh token failed, log the user out
        api.dispatch(resetTokens());
        api.dispatch(logout());
      }
    } else {
      // No refresh token available, log the user out
      api.dispatch(resetTokens());
      api.dispatch(logout());
    }
  }

  return result;
};
