import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./context/userContext.jsx";
import { ModalProvider } from "./context/modalContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { SocketProvider } from "./context/socketContext.jsx";
import { NotificationProvider } from "./context/notificationContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SocketProvider>
    <AuthContextProvider>
      <BrowserRouter>
        <ModalProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </ModalProvider>
      </BrowserRouter>
    </AuthContextProvider>
  </SocketProvider>
);
