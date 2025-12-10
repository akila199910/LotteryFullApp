import React, {  useEffect, useState } from "react";
import { Link, useNavigate , useParams } from "react-router-dom";
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
  const navigate = useNavigate();


  const [result, setResult] = useState<PlayResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    amount: "",
    ticketId: ticketId,
  });

  const [played, setPlayed] = useState(false);


  useEffect(() => {
    if (played && result === null) {
      navigate("/tickets");
    }
  }, [played, result]);

  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setLoading(true);

      try {
        console.log("Submitting play request with form data:", form);
        const response = await api.post("/play",{
          amount: form.amount,
          ticketId: form.ticketId,
        });

        setResult(response.data.data);
        setPlayed(true);

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

        {
          result === null &&
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
        }

        {result && (
  <div className="mt-8 bg-white border-2 border-dashed border-gray-400 p-6 rounded-2xl shadow-xl text-center">

    <h3 className="text-3xl font-bold text-pink-600 mb-4">🎟️ Winning Ticket!</h3>

    <div className="space-y-3 text-lg">
      <p>
        <span className="font-semibold text-gray-600">Drawn Sequence:</span>
        <span className="font-bold text-gray-900 ml-2">{result.DrawnSequence}</span>
      </p>

      <p>
        <span className="font-semibold text-gray-600">Your Pick:</span>
        <span className="font-bold text-blue-600 ml-2">{result.selectedSequence}</span>
      </p>

      <p>
        <span className="font-semibold text-gray-600">Winning %:</span>
        <span className="font-bold text-purple-700 ml-2">{result.winningPercentage}%</span>
      </p>
    </div>

    <div className="mt-4 bg-yellow-300 text-gray-900 p-4 rounded-xl text-2xl font-bold shadow">
      💰 Prize: Rs. {result.amountWon}
    </div>

    <button
      onClick={() => navigate("/tickets")}
      className="w-full mt-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold text-lg"
    >
      Play Again 🔁
    </button>

  </div>
)}

      </div>
    </div>
  );
};

export default Play;
