import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosInstance";

interface PlayResponse {
  DrawnSequence: string;
  amountWon: number;
  lotteryId: number;
  selectedSequence: string;
  winningPercentage: number;
}

const Play: React.FC = () => {

  const { ticketId } = useParams();


  const [result, setResult] = useState<PlayResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    amount: "",
    ticketId: ticketId,
  });

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setLoading(true);

      try {
        console.log("Submitting play request with form data:", form);
        const response = await api.post("/play",{
          form
        });

        setResult(response.data.data);
      } catch (error : any) {

        if (error.response?.status === 400) {
          setError(error.response.data.message || "Invalid play request.");
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
            placeholder="Play Amount"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />

          <input
            type="hidden"
            placeholder="Ticket ID"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={form.ticketId}
            onChange={(e) =>
              setForm({ ...form, ticketId: e.target.value })
            }

          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white text-lg font-semibold
            ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}
              transition`}
          >
            {loading ? "Processing..." : "Play Now"}
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
