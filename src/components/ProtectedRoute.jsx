// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; // ✅ use hook

const ProtectedRoute = ({ children }) => {
  const { user } = useCart(); // ✅ access user from hook

  if (!user) {
    alert("You must log in or create an account to access this page!");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
