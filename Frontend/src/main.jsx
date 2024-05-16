import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
//dotenv 
import dotenv from 'dotenv';
dotenv.config();

ReactDOM.createRoot(document.getElementById("root")).render(

<Auth0Provider
    domain = {process.env.domain}
    clientId = {process.env.clientId}
    authorizationParams={{
      redirect_uri: "http://localhost:5173"
    }}
  >
      <App />
    </Auth0Provider>
);
