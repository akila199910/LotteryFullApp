import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { useAuth } from "../context/AuthContext";

type ValidationErrors = Record<string, string>;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<
    ValidationErrors | null
  >(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setValidationErrors(null);
    setLoading(true);

    try {

      await login(form.email, form.password);
      navigate("/tickets");

    } catch (err: unknown) {

      if ((err as AxiosError).isAxiosError) {
        const axiosErr = err as AxiosError;
        const status = axiosErr.response?.status;
        const data = axiosErr.response?.data;

        if (status === 400 && data && typeof data === "object") {
          setValidationErrors(data as ValidationErrors);
        } else if (status === 500) {
          setError("Server error. Please try again later.");
        } else if (axiosErr.message) {
          setError(axiosErr.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } else {
        setError("Network error. Please check if backend is running.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login Account
        </h2>

        {error && (
          <div className="mb-4 text-red-600 bg-red-100 p-3 rounded-lg border border-red-300 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Field */}
          <div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className={`w-full border p-3 rounded-lg outline-none focus:ring-2 transition-all ${
                validationErrors?.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-indigo-400"
              }`}
              value={form.email}
              onChange={handleChange}
            />
            {validationErrors?.email && (
              <p className="text-red-600 text-xs mt-1 ml-1 font-medium">
                {validationErrors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className={`w-full border p-3 rounded-lg outline-none focus:ring-2 transition-all ${
                validationErrors?.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-indigo-400"
              }`}
              value={form.password}
              onChange={handleChange}
            
            />
            {validationErrors?.password && (
              <p className="text-red-600 text-xs mt-1 ml-1 font-medium">
                {validationErrors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white p-3 rounded-lg transition-colors font-semibold shadow-md ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg"
            }`}
          >
            {loading ? "Login..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-600">
          Do not have an account ?{" "}
          <Link to="/register">
            <span className="text-indigo-600 hover:underline cursor-pointer">
              Register
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
