import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain={process.env.React_App_Domain}
    clientId={process.env.React_App_ClientId}
    authorizationParams={{
      redirect_uri: "http://localhost:5173/",
      scope: "openid profile email",
      audience: "bankaidayo",
    }}
  >
    <App />
  </Auth0Provider>
);
