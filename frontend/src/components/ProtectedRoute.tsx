import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/store";


interface ProtectedRouteProps {
  allowedRoles: string[]; 
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  children,
}) => {
  const { isAuthenticated, role } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(role)) {
    
    return <Navigate to={`/dashboard`} replace />;
  }

  
  return children;
};

export default ProtectedRoute;
