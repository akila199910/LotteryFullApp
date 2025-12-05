import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path ? "text-indigo-600 font-semibold" : "text-gray-700";

  return (
    <nav className="bg-white shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          🎟 Lottery App
        </Link>

        {/* Links */}
        <div className="flex items-center space-x-6">
          <Link to="/" className={isActive("/")}>
            Tickets
          </Link>

          <Link to="/play" className={isActive("/play")}>
            Play
          </Link>

          {/* Auth links */}
          <Link to="/" className={isActive("/login")}>
            Login
          </Link>

          <Link
            to="/register"
            className="bg-indigo-600 text-white py-1 px-4 rounded-lg hover:bg-indigo-700 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
