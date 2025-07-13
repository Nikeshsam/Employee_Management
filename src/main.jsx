import React from "react";
import ReactDOM from "react-dom/client";
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {LoginUserProvider} from './context/LoginUserContext.jsx'
const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoginUserProvider>
        <App />
      </LoginUserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

