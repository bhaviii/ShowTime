import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import MovieProvider from "./context/Movie.context";
import { GoogleOAuthProvider } from "@react-oauth/google";
const clientId =
  "120133169842-olvt347b5cmlq8qfluji98bf1n2eht0n.apps.googleusercontent.com";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MovieProvider>
        <GoogleOAuthProvider clientId={clientId}>
          <App />
        </GoogleOAuthProvider>
      </MovieProvider>
    </BrowserRouter>
  </React.StrictMode>
);
