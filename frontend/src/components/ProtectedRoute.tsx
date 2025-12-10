import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import type { JSX } from "react/jsx-dev-runtime";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { accessToken, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!accessToken) return <Navigate to="/" />;

  return children;
}
