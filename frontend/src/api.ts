export interface Ticket {
  id: number;
  sequence: string;
}

export interface PlayRequest {
  name: string;
  contactNumber: string;
  ticketId: number;
}

export interface RegisterRequest {
    name?: string;
    email?: string;
    password?: string;
    contactNumber?: string;
    confirmPassword?: string;
}
export interface LoginRequest {
    email?: string;
    password?: string;
}

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const getTickets = async () => {
  const res = await fetch(`${BASE_URL}/tickets`);
  return res.json();
};

export const playTicket = async (payload: PlayRequest) => {
  return fetch(`${BASE_URL}/play`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};

export const registerUser = async (payload:RegisterRequest)=> {
  return fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export const loginUser = async (payload:LoginRequest)=> {
  return fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}