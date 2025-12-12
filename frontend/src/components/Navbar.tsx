import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const { accessToken, logout } = useAuth();


    if (!accessToken) return null;

  return (
    <nav className="bg-white shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          🎟 Lottery App
        </Link>

        {/* Right Side Buttons */}
        <div className="flex items-center space-x-6">

          {/* Show Login + Register when NOT logged in */}
          {!accessToken && (
            <>
              <Link
                to="/"
                className="bg-indigo-600 text-white py-1 px-4 rounded-lg hover:bg-indigo-700 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-indigo-600 text-white py-1 px-4 rounded-lg hover:bg-indigo-700 transition"
              >
                Register
              </Link>
            </>
          )}

          {/* Show Logout when user IS logged in */}
          {accessToken && (
            <button
              onClick={logout}
              className="bg-red-600 text-white py-1 px-4 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
