import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/axiosInstance";

interface PlayResponse {
  DrawnSequence: string;
  amountWon: number;
  lotteryId: number;
  selectedSequence: string;
  winningPercentage: number;
}

const Play: React.FC = () => {
  const location = useLocation();
  const preSelectedId: number = location.state?.ticketId || 0;

  const [form, setForm] = useState({
    name: "",
    contactNumber: "",
    ticketId: preSelectedId,
  });

  const [result, setResult] = useState<PlayResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setLoading(true);

      try {
        const response = await api.post("/auth/", form);

        alert(response.data.message);
        
        window.location.href = "/";
      } catch (error : any) {

        if (error.response?.status === 400) {

          return;
        }

        if (error.status === 500) {
          setError("Server error. Please try again later.");
          return;
        }

        setError("Network error. Please check your internet or backend.");
      }
      finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">🎰 Play Lottery</h2>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-800 border border-red-300 rounded-lg">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="text"
            placeholder="Contact Number"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={form.contactNumber}
            onChange={(e) =>
              setForm({ ...form, contactNumber: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Ticket ID"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={form.ticketId}
            onChange={(e) =>
              setForm({ ...form, ticketId: Number(e.target.value) })
            }
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white text-lg font-semibold
            ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}
              transition`}
          >
            {loading ? "Processing..." : "Submit"}
          </button>
        </form>

        {result && (
          <div className="mt-8 bg-gray-50 border p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-3 text-center">🎉 Result</h3>

            <p><strong>Drawn Sequence:</strong> {result.DrawnSequence}</p>
            <p><strong>Selected Sequence:</strong> {result.selectedSequence}</p>
            <p><strong>Amount Won:</strong> Rs. {result.amountWon}</p>
            <p><strong>Winning Percentage:</strong> {result.winningPercentage}%</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Play;
