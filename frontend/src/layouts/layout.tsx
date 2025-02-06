import React from "react";
import { Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../layouts/sidebar"; // Path to your Sidebar component
import { useAppSelector } from "../store/store";
import LazyComponent from '../components/LazyComponent';

interface LayoutProps {
  allowedRoles: string[]; // You pass allowed roles as props
}

const Layout: React.FC<LayoutProps> = ({ allowedRoles }) => {
  const { isAuthenticated, role } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    } else if (!allowedRoles.includes(role)) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, role, allowedRoles, navigate]);

  // If user is not authenticated or doesn't have the required role, render nothing (or redirect)
  if (!isAuthenticated || !allowedRoles.includes(role)) {
    return null; // You can also redirect here instead of returning null
  }

  return (
    <LazyComponent>
    <Box sx={{ display: "flex" }}>
      <Sidebar role={role} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          padding: 3,
          marginTop: "64px",
          marginLeft: "250px", // Ensure this aligns with your sidebar width
        }}
      >
        <Outlet />
      </Box>
    </Box>
    </LazyComponent>
  );
};

export default Layout;
