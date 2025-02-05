import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";  

// Define a type for the slice state
interface AuthState {
  accessToken: string;
  refreshToken: string;
  isAuthenticated: boolean;
  loading: boolean;
  role: string | "";
  user: {};
}

// Define the initial state using that type
const initialState: AuthState = {
  accessToken: localStorage.getItem("accessToken") || "",
  refreshToken: localStorage.getItem("refreshToken") || "",
  isAuthenticated: !!localStorage.getItem("accessToken"), // Check if accessToken exists in localStorage
  loading: true,
  role: localStorage.getItem("role") || "",
  user: (() => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : {};
    } catch {
      return {};
    }
  })(),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<{ loading: boolean }>) => {
      state.loading = action.payload.loading;
    },
    setTokens: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        role: string;
        user: {};
      }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.role = action.payload.role;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      // Persist data in localStorage
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      localStorage.setItem("role", action.payload.role);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    resetTokens: (state) => {
      state.accessToken = "";
      state.refreshToken = "";
      state.isAuthenticated = false;
      state.role = "";
      state.user = {};
      // Remove data from localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("role");
      localStorage.removeItem("user");
    },
    logout: (state) => {
      // Reset the tokens and other state fields
      
      state.isAuthenticated = false;
      state.accessToken = "";
      state.refreshToken = "";
      state.role = "";
      state.user = {};
      // Remove data from localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("role");
      localStorage.removeItem("user");
      
    },
  },
});

export const { setLoading, setTokens, resetTokens, logout } = authSlice.actions;

export default authSlice.reducer;
