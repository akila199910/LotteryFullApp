import React, { useEffect, useState } from "react";
import { getTickets, type Ticket } from "../api";
import { useNavigate } from "react-router-dom";

const Tickets: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getTickets().then((res) => setTickets(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">🎟 Available Tickets</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition cursor-pointer border border-gray-200"
          >
            <h2 className="text-2xl font-bold text-gray-800 text-center">{ticket.sequence}</h2>

            <button
              onClick={() =>
                navigate("/play", { state: { ticketId: ticket.id } })
              }
              className="mt-5 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Play This Ticket
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tickets;
