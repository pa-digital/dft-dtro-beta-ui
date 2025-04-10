import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/auth.context";
import { Routes as r } from "../../constants/routes";

const AdminRoute: React.FC = () => {
  const { isAuthenticated, isLoading, isAdmin } = useAuth();

  if (isLoading) return null;

  if (!isAuthenticated) return <Navigate to={r.Login} replace />;
  if (!isAdmin) return <Navigate to={r.Unauthorized} replace />;

  return <Outlet />;
};

export default AdminRoute;
