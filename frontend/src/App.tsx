import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Play from "./pages/Play";
import Tickets from "./pages/Ticket";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

const App: React.FC = () => {
  return (
    
      <BrowserRouter>
      <AuthProvider>
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

            <Route
              path="/tickets/:ticketId"
              element={
                <ProtectedRoute>
                  <Play />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        </AuthProvider>
      </BrowserRouter>
  );
};

export default App;
