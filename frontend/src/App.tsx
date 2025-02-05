import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "./store/store";
import { setTokens } from "./store/reducers/authReducer";
import HomePage from "./pages/homepage";
import AboutPage from './pages/about';
import ContactPage from './pages/contact';
import NotFoundPage from "./pages/errorPage";
import Layout from "./layouts/layout";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import LazyComponent from './components/LazyComponent';
import ResetPasswordPage from './pages/resetpassword';
import ForgotPasswordPage from './pages/forgetpassword';
import AuthPage from './pages/auth';
import LanguageSwitcher from "./components/languageSwitcher";
import { AnimatePresence } from "motion/react";

const AdminDashboard = React.lazy(() => import("./components/AdminDashboard"));
const UserDashboard = React.lazy(() => import("./components/UserDashboard"));
const Profile = React.lazy(() => import("./pages/profile"));
const EditUser = React.lazy(() => import("./pages/edituser"));
const AllUsers = React.lazy(() => import("./pages/alluser"));
const ChangePassword = React.lazy(() => import("./pages/changepassword"));

function App() {
  const dispatch = useDispatch();
  const { role } = useAppSelector((state) => state.auth);

 useEffect(() => {
   const accessToken = localStorage.getItem("accessToken");
   const refreshToken = localStorage.getItem("refreshToken");
   const role = localStorage.getItem("role");
   const user = localStorage.getItem("user")
     ? JSON.parse(localStorage.getItem("user")!)
     : {};

   if (accessToken && refreshToken && role) {
     dispatch(setTokens({ accessToken, refreshToken, role, user }));
   }
 }, [dispatch]);

  return (
    <>
    <AnimatePresence mode="wait">
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={<NotFoundPage />} />

      <Route path="/auth" element={<PublicRoute><AuthPage /></PublicRoute>} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "USER"]}>
            <Layout role={role} />
          </ProtectedRoute>
        }
      >
        <Route
          path="dashboard"
          element={
            <LazyComponent>
              {role === "ADMIN" ? <AdminDashboard /> : <UserDashboard />}
            </LazyComponent>
          }
        />
        <Route
          path="profile"
          element={
            <LazyComponent>
              <Profile />
            </LazyComponent>
          }
        />
        <Route
          path="editUser"
          element={
            <LazyComponent>
              <EditUser />
            </LazyComponent>
          }
        />
        <Route
          path="users"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
            <LazyComponent>
              <AllUsers />
            </LazyComponent>
           </ProtectedRoute>
          }
        />
        <Route
          path="changePassword"
          element={
            <LazyComponent>
              <ChangePassword />
            </LazyComponent>
          }
        />
      </Route>
    </Routes>
    </AnimatePresence>
    <LanguageSwitcher />
    </>
  );
}

export default App;
