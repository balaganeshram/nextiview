import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { GoogleOAuthProvider } from "@react-oauth/google";

// ✅ Import your UserProvider
import { UserProvider } from "./context/UserContext"; // Adjust the path if needed

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);

const clientId = "728204570871-vma3hhb7325ommbofssd1rvncpke6fhq.apps.googleusercontent.com";

root.render(
  <GoogleOAuthProvider clientId={clientId}>
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </GoogleOAuthProvider>
);
