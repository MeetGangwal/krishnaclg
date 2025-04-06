import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user && role === "Admin") {
    // Allow hardcoded admin access
    return children;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />; // Redirect to home if role mismatch
  }

  return children; // Render children if role matches or no role is specified
};

export default ProtectedRoute;