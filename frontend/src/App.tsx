import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Play from "./pages/Play";
import Tickets from "./pages/Ticket";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="font-sans">
        <Routes>
          <Route path="/" element={<Tickets />} />
          <Route path="/play" element={<Play />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
