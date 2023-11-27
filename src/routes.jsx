// Inbuilt modules
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

// Pages
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import GraphPage from "./pages/Graph/GraphPage";
import RestPage from "./pages/Rest/RestPage";

// Context
import { DocumentContextProvider } from "./appContext";

function AppRoutes({ appData, hasSessionData }) {
  const {
    config: { apiNexus: { authentication } } = {
      apiNexus: { authentication: null },
    },
  } = appData || {};

  const [hasSession, setHasSession] = useState(hasSessionData);

  // Helper function to determine the route element based on authentication and hasSession
  function getRouteElement(authentication, hasSession, component) {
    if (!authentication && !hasSession) {
      return component;
    } else if (authentication && !hasSession) {
      return (
        <LoginPage
          authentication={authentication}
          onLoginSuccess={setHasSession}
          logo={appData?.config?.apiNexus?.info?.logo ?? null}
        />
      );
    } else {
      return component;
    }
  }

  return (
    <DocumentContextProvider context={appData}>
      <Routes>
        <Route
          path="/"
          element={getRouteElement(authentication, hasSession, <MainPage />)}
        />
        <Route
          path="graphql_api"
          element={getRouteElement(authentication, hasSession, <GraphPage />)}
        />
        <Route
          path="rest_api"
          element={getRouteElement(authentication, hasSession, <RestPage />)}
        />
        <Route
          path="*"
          element={getRouteElement(authentication, hasSession, <MainPage />)}
        />
      </Routes>
    </DocumentContextProvider>
  );
}

export default AppRoutes;
