import React from "react";
import Home from './pages/Home';
import ReactDOM from "react-dom/client";
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Home" element={<Home />} />
    </Routes>
  </BrowserRouter>
);

