import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./context/userContext.jsx";
import { ModalProvider } from "./context/modalContext.jsx";
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
  <BrowserRouter>
    <ModalProvider>
      <App />
    </ModalProvider>
    </BrowserRouter>
  </AuthContextProvider>
);
