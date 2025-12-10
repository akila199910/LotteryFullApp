import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Play from "./pages/Play";
import Tickets from "./pages/Ticket";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import { AuthProvider, useAuth } from "./context/AuthContext";
import type { JSX } from "react/jsx-dev-runtime";


const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { accessToken, loading } = useAuth();

  if (loading) return null;

  if (!accessToken) return <Navigate to="/" replace />;

  return children;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="font-sans">
          <Navbar />

          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/tickets"
              element={
                <ProtectedRoute>
                  <Tickets />
                </ProtectedRoute>
              }
            />

            {/* <Route
              path="/play"
              element={
                <ProtectedRoute>
                  <Play />
                </ProtectedRoute>
              }
            /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
