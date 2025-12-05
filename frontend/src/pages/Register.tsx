import React, { useState } from "react";
import { registerUser, type RegisterRequest } from "../api";

type ValidationErrors = Record<string, string>;

const Register: React.FC = () => {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setValidationErrors(null);
    setLoading(true);

    try {
      const response = await registerUser(form);

      // 1. Handle Validation Errors (400 Bad Request)
      if (response.status === 400) {
        const data = await response.json();
        setValidationErrors(data); // Save the Map<String, String>
        setLoading(false);
        return;
      }

      // 2. Handle Server Errors (500)
      if (response.status === 500) {
        setError("Server error. Please try again later.");
        setLoading(false);
        return;
      }

      if (response.ok) {
        window.location.href = "/login"; 
      } else {
        setError("An unexpected error occurred.");
      }

    } catch (err) {
      setError("Network error. Please check if backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof RegisterRequest, value: string) => {
    setForm({ ...form, [field]: value });
    
    if (validationErrors && validationErrors[field]) {
        const newErrors = { ...validationErrors };
        delete newErrors[field];
        setValidationErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h2>

        {error && (
          <div className="mb-4 text-red-600 bg-red-100 p-3 rounded-lg border border-red-300 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          
          {/* Name Field */}
          <div>
            <input
              type="text"
              placeholder="Full Name"
              className={`w-full border p-3 rounded-lg outline-none focus:ring-2 transition-all ${
                validationErrors?.name ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-indigo-400"
              }`}
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            {validationErrors?.name && (
              <p className="text-red-600 text-xs mt-1 ml-1 font-medium">{validationErrors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <input
              type="email"
              placeholder="Email"
              className={`w-full border p-3 rounded-lg outline-none focus:ring-2 transition-all ${
                validationErrors?.email ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-indigo-400"
              }`}
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            {validationErrors?.email && (
              <p className="text-red-600 text-xs mt-1 ml-1 font-medium">{validationErrors.email}</p>
            )}
          </div>

          {/* Contact Number Field */}
          <div>
            <input
              type="text"
              placeholder="Contact Number (07xxxxxxxx)"
              className={`w-full border p-3 rounded-lg outline-none focus:ring-2 transition-all ${
                validationErrors?.contactNumber ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-indigo-400"
              }`}
              value={form.contactNumber}
              onChange={(e) => handleChange("contactNumber", e.target.value)}
            />
            {validationErrors?.contactNumber && (
              <p className="text-red-600 text-xs mt-1 ml-1 font-medium">{validationErrors.contactNumber}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <input
              type="password"
              placeholder="Password"
              className={`w-full border p-3 rounded-lg outline-none focus:ring-2 transition-all ${
                validationErrors?.password ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-indigo-400"
              }`}
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
            {validationErrors?.password && (
              <p className="text-red-600 text-xs mt-1 ml-1 font-medium">{validationErrors.password}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              className={`w-full border p-3 rounded-lg outline-none focus:ring-2 transition-all ${
                validationErrors?.confirmPassword ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-indigo-400"
              }`}
              value={form.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
            />
            {/* Handle both specific field error or class-level DTO error */}
            {validationErrors?.confirmPassword && (
              <p className="text-red-600 text-xs mt-1 ml-1 font-medium">{validationErrors.confirmPassword}</p>
            )}
            {validationErrors?.registerReqDTO && (
               <p className="text-red-600 text-xs mt-1 ml-1 font-medium">{validationErrors.registerReqDTO}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white p-3 rounded-lg transition-colors font-semibold shadow-md ${
                loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-600">
          Already have an account?{" "}
          <span className="text-indigo-600 hover:underline cursor-pointer">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
