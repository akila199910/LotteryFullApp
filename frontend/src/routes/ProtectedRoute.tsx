import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";


export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { accessToken, loading } = useAuth();

  // Wait until AuthProvider finishes checking refresh token
  if (loading) return null;

  // If no access token, redirect to login
  if (!accessToken) return <Navigate to="/" replace />;

  return children;
}
