import express from "express";
import path from "path";
import session from "express-session";
import { configLoader } from "./configLoader.js";

import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
// Load the server routes from this file
import AppRoutes from "../src/routes.jsx";
require("dotenv").config();

const server = express();
const PORT = process.env.PORT || 3001;
server.set("trust proxy", 1);
server.use(
  session({
    name: `bb5dc8842ca31d4603d6aa11448d1654`,
    secret: "82defcf324571e70b0521d79cce2bf3fffccd69",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 60000 * 30,
    },
  })
);

function serverDocumentationStaticFiles(directory) {
  return (req, res, next) => {
    const { url } = req;
    const paths = url?.split("/")?.filter(Boolean) ?? [];

    if (paths.length > 0) {
      req.url = paths?.[paths?.length - 1] ?? "/";
      express.static(directory, { maxAge: "30d" })(req, res, (err) => {
        req.url = url;
        next(err);
      });
    } else {
      next();
    }
  };
}

server.use(
  serverDocumentationStaticFiles(path.resolve(process.cwd(), "doc", "dist"), {
    maxAge: "30d",
  })
);

// Define API routes
server.post("/login", (req, res, next) => {
  req.session.isLoggedIn = true;
  res.status(200).json({ message: "success" });
});

// Handle the multiple routes for the UI renders
server.get("*", async (req, res) => {
  try {
    const [appContext, context] = [
      await configLoader(path.join(process.cwd(), "config.yml")),
      {},
    ];
    appContext.hasSessionData = req?.session?.isLoggedIn || false;
    const app = (
      <StaticRouter location={req.url} context={{}}>
        <AppRoutes
          appData={appContext}
          hasSessionData={req?.session?.isLoggedIn || false}
        />
      </StaticRouter>
    );

    const appHtml = ReactDOMServer.renderToString(app);

    if (context.url) {
      res.redirect(301, context.url);
    } else {
      res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8" />
          <title>API Documentation</title>
          <link type="text/css" rel="stylesheet" href="bundle.css" />
          <link type="text/css" rel="stylesheet" href="bootstrap-bundle.min.css" />
          <script>
            window.__INITIAL_CONTEXT__ = ${JSON.stringify(appContext || {})};
          </script>
        </head>
        <body >
          <div id="root">
            ${appHtml}
          </div>
          <script src="bundle.js"></script>
        </body>
        </html>
    `);
    }
  } catch (ApiError) {
    console.log(`Api Request Error [ApiError] :: ${JSON.stringify(ApiError)}`);
    throw ApiError;
  }
});

server.listen(PORT, () => {
  console.log(`The document server is listening on port :: ${PORT}`);
});
