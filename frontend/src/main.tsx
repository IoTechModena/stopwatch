import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain="manuelcampi.eu.auth0.com"
        clientId="7ZvDxcyIxwYz3IWx6ycjYXyX9EPEKVS5"
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: "https://localhost/API",
        }}
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);
