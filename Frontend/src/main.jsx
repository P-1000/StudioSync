import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./context/userContext.jsx";
import { ModalProvider } from "./context/modalContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <ModalProvider>
      <App />
    </ModalProvider>
  </AuthContextProvider>
);
