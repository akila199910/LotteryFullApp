export interface Ticket {
  id: number;
  sequence: string;
}

export interface PlayRequest {
  name: string;
  contactNumber: string;
  ticketId: number;
}

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const getTickets = async () => {
  const res = await fetch(`${BASE_URL}/tickets`);
  return res.json();
};

export const playTicket = async (payload: PlayRequest) => {
  const res = await fetch(`${BASE_URL}/play`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
};
