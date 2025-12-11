import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";


export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { accessToken } = useAuth();


  if (!accessToken) return <Navigate to="/" replace />;


  return children;
}
