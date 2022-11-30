import React from "react";
import { useAppContext } from "../context/appContext";
import { useNavigate, Outlet, Navigate } from "react-router-dom";
function ProtectedRoute() {
  const navigate = useNavigate();
  const { user } = useAppContext();

  return user ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;
