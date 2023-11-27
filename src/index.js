import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes"; // Your route configuration

// Load the app context & add to route
const loadServerContext = window.__INITIAL_CONTEXT__ || {};

// SSR rendering for the root component
hydrate(
  <BrowserRouter>
    <AppRoutes
      appData={loadServerContext}
      hasSessionData={loadServerContext?.hasSessionData ?? false}
    />
  </BrowserRouter>,
  document.getElementById("root")
);
