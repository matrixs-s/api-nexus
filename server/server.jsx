import express from "express";
import path from "path";
import fs from "fs";
import session from "express-session";
import { configLoader } from "./configLoader.js";

import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
// Load the server routes from this file
import AppRoutes from "../src/routes.jsx";
require("dotenv").config();

const allowedStaticFiles = [
  "bundle.css",
  "bundle.js",
  "bootstrap-bundle.min.css",
];

const server = express();
const PORT = process.env.DOC_PORT || 3001;
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

const renderStaticFiles = (staticPath, allowedStaticFiles) => {
  return (req, res, next) => {
    const fileName = allowedStaticFiles.find((file) => req.url.endsWith(file));
    if (!fileName) {
      next();
      return;
    }
    const filePath = path.join(staticPath, fileName);
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        next();
      } else {
        res.sendFile(filePath);
      }
    });
  };
};

server.use(
  renderStaticFiles(path.join(process.cwd(), "doc", "dist"), allowedStaticFiles)
);

const loadRoutes = (basePath) => {
  server.get(`${basePath}/favicon.ico`, (req, res) => res.status(204));

  server.post(`${basePath}/login`, (req, res, next) => {
    req.session.isLoggedIn = true;
    res.status(200).json({ message: "success" });
  });

  server.get(`${basePath}/doc-server`, (req, res, next) => {
    res.status(200).json({ message: "Document server is up & running" });
  });

  // Handle the multiple routes for the UI renders
  server.get("*", async (req, res) => {
    try {
      const [appContext, context] = [
        await configLoader(path.join(process.cwd(), "config.yml")),
        {},
      ];
      appContext.hasSessionData = req?.session?.isLoggedIn || false;
      appContext.basePath = server?.locals?.basePath ?? null;
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
          <script>
            if (!window.location.href.endsWith('/')) {
              window.location.href = window.location.href + '/';
            }
          </script>
          <link type="text/css" rel="stylesheet" href="bundle.css" />
          <link type="text/css" rel="stylesheet" href="bootstrap-bundle.min.css" />
          <script>
            window.__INITIAL_CONTEXT__ = ${JSON.stringify(appContext || {})};
          </script>
        </head>
        <body >
          <div id="root">${appHtml}</div>
          <script src="bundle.js"></script>
        </body>
        </html>
    `);
      }
    } catch (ApiError) {
      console.log(
        `Api Request Error [ApiError] :: ${JSON.stringify(ApiError)}`
      );
      throw ApiError;
    }
  });
};

server.listen(PORT, () => {
  console.log(`The document server is listening on port :: ${PORT}`);
  loadRoutes(server?.locals?.basePath ?? "");
});

module.exports = (basePath) => (server.locals.basePath = basePath);