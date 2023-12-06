# api-nexus

[![npm](https://img.shields.io/npm/v/api-nexus)](https://www.npmjs.com/package/api-nexus)
[![npm](https://img.shields.io/npm/dw/api-nexus)](https://www.npmjs.com/package/api-nexus)
[![GitHub](https://img.shields.io/github/license/your-username/api-nexus)](https://github.com/your-username/api-nexus/blob/main/LICENSE)

## Overview

**api-nexus** is a powerful tool for effortlessly generating comprehensive API documentation for both RESTful and GraphQL APIs. Whether you are building REST APIs or GraphQL schemas, this tool streamlines the documentation process, ensuring clarity and consistency.
**Required Node Version => 16.0.0**

## Documentation View

    <img src="https://github.com/matrixs-s/api-nexus/tree/master/public/images/login-page.png" width="400">

    <img src="https://github.com/matrixs-s/api-nexus/tree/master/public/images/landing-page.png" width="400">

    <img src="https://github.com/matrixs-s/api-nexus/tree/master/public/images/graph-apis.png" width="400">

    <img src="https://github.com/matrixs-s/api-nexus/tree/master/public/images/rest-apis.png" width="400">

## Features

- **Automatic Documentation Generation:** Easily generate API documentation based on your RESTful endpoints and GraphQL schemas.
- **Separate REST and GraphQL Documentation:** Create distinct documents for RESTful APIs and GraphQL APIs.
- **Developer-Friendly Markdown Format:** The generated documentation is presented in Markdown format, making it easy to read and edit.
- **Customization Options:** Customize the appearance and content of your API documentation to meet your project's specific needs.
- **Interactive GraphQL Playground:** Include an interactive GraphQL Playground for users to experiment with queries.

## Getting Started

    1. Install **api-nexus** globally to use it as a command-line tool:

    ```bash
    npm install -g api-nexus

        OR

    npm install api-nexus
    ```

    This is a global installation, but you can also either:

    - Clone this repository
    - Add `api-nexus` as a dependency to an existing project.

    2. Define a `config.yml` that specifies how you'd like to generate your docs.
    See [YAML Options](https://github.com/matrixs-s/api-nexus/blob/master/config.yml) for more.

    3. Set Environment Variables

    Create a .env file in the project root directory and export the following environment variables:

    ```bash
        DOC_USER=test
        DOC_PASSWORD=test
        DOC_ENV=Development
        DOC_PORT=3001
    ```
    Explanation:
        - If authentication is defined in your config.yml, provide the following environment variables:
            - DOC_USER=test
            - DOC_PASSWORD=test
        - The default server port is 3001. If you want to use a different port, set it with the DOC_PORT environment variable:
            - Example: DOC_PORT=4000
        - Add the environment for which you want to create the documentation:
            - DOC_ENV=Development

    4. Update Package.json Scripts

        Add the following command in your **package.json** to create the api documentation:

        ```bash
            jsonCopy code"scripts": {  "build-api-documentation": "npm explore api-nexus -- npm run build-api-documentation",  "start": "node app.js"}
        ```

    5. Generate Documentation Files

        Run the following command to generate the documentation files:

        ```bash
            bashCopy npm run build-api-documentation
        ```

    6. Verify Generated Files

        After running the command, a **doc** folder will be created in the root directory with the following structure:

        ```bash
            - doc
                - build
                - dist
                - graph
                    - [introspection.json](https://github.com/matrixs-s/api-nexus/tree/master/doc/graph/introspection.json)
                    - [graphMetaData.json](https://github.com/matrixs-s/api-nexus/tree/master/doc/graph/graphMetaData.json)
                - rest
                    - [restMetaData.json](https://github.com/matrixs-s/api-nexus/tree/master/doc/rest/restMetaData.json)
        ```

        Note: These files are auto-generated, and renaming them may cause issues in document generation.

    7. Include Code Lines in Your Project

        Include the following code lines in your project to enable the documentation:

        ```node
            const express = require("express");
            const app = express();const path = require("path");
            const documentApi = require(path.join(__dirname, "doc", "build", "server.js"));

            documentApi('/api/my-app/document')

            app.get("/health", async (req, res) => {
                res.send("server is up");
            });

            app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).send("Something went wrong!");
            });

            const PORT = process.env.PORT || 3000;

            app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            });
        ```

        Note: Adjust the **path** variable to set the base path at which your document will be visible. For example,
        **/api/document**, **/api-project/document, etc**.

    8. Access Document Server

        You can access the document server at the following URL with the specified base path:

        - ```bash
            host:3001/api/my-app/document
          ```

        Note: If you have set the port to 4000, the URL will be accessible at **host:4000/api/my-app/document**.


## Docker Setup

    Certainly! Here's an updated explanation that includes the additional information:

    ```bash
        # Use a lightweight Node.js image
        FROM node:16

        # Set the working directory
        WORKDIR /app

        # Copy only the package.json and package-lock.json to leverage Docker cache
        COPY package*.json ./

        # Install app dependencies
        RUN npm install

        # Build the API documentation (if needed)
        RUN npm run build-api-documentation

        # Copy the rest of the application code
        COPY . .

        # Expose the necessary ports
        EXPOSE 3000
        EXPOSE 3001

        # Run the application
        CMD ["npm", "start"]
    ```

## Nginx Setup

    ```bash
        server {
            server_name   my-domain;

            client_max_body_size 1024m;

            location /api/document {
                proxy_pass http://my-domain:3004/api/document;
                proxy_http_version 1.1;
                proxy_set_header  Host              $http_host;
                proxy_set_header  X-Real-IP         $remote_addr;
                proxy_set_header  X-Forwarded-For   $proxy_add_x_forwarded_for;
                proxy_set_header  X-Forwarded-Proto $scheme;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
            }

            location / {
            proxy_pass                          http://my-domain:3002;
            proxy_http_version                  1.1;
            proxy_set_header  Host              $http_host;
            proxy_set_header  X-Real-IP         $remote_addr;
            proxy_set_header  X-Forwarded-For   $proxy_add_x_forwarded_for;
            proxy_set_header  X-Forwarded-Proto $scheme;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            }
    # ... Other configurations ...

    # ... More configurations ...

    # ... Additional configurations ...
        }
    ```

## Additional Explanation

    Let's consider you set the base URL as **/api/document** using the **documentApi('/api/document')** configuration in your application.

    Now, in the Nginx setup, the **location /api/document** block is configured to handle requests for **/api/document**. This block uses **proxy_pass** to direct these requests to the document API server, which is assumed to be running on port 3001 and mapped to port 3004 using the Docker command:

    ```bash
        bashCopy codesudo docker run -it -p 3002:3000 -p 3004:3001 api-nexus
    ```

    So, the **proxy_pass** in the Nginx configuration becomes ```bash http://my-domain:3004/api/document```.

    You can handle other base URLs in a similar way by creating additional **location** blocks in the Nginx configuration, allowing you to route different parts of your application to various backend servers based on your requirements. Adjust the port numbers and base URLs accordingly for your specific setup.

## Getting Started With Http Proxy

    If you prefer not to use Nginx for proxying, follow the steps below to serve the document using the HTTP proxy instead.

    ```node

        const express = require("express");
        const app = express();
        const path = require("path");
        const { createProxyMiddleware } = require("http-proxy-middleware");

        // Include the API Nexus documentation server
        const documentApi = require(path.join(__dirname, "doc", "build", "server.js"));

        // Specify the base path for the API documentation
        documentApi('/api/document');

        // Define a route for server-side rendering logic
        app.get("/health", async (req, res) => {
        res.send("server is up");
        });

        // Create a proxy middleware for the "/api/document" route
        const documentProxy = createProxyMiddleware({
        target: "http://domain:3001", // Replace with the actual destination server URL
        changeOrigin: true,
        });

        // Use the proxy middleware for the "/api/document" route
        app.use("/api/document", documentProxy);

        // Error handling middleware
        app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send("Something went wrong!");
        });

        // Specify the port on which the server should listen
        const PORT = process.env.PORT || 3000;

        // Start the server
        app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        });
    ```

    Explanation: app.use("/api/document", documentProxy);: Uses the proxy middleware for the "/api/document" route.

## Configuration

### General Configuration Details

| Variable              | Description                                | Default                |
|-----------------------|--------------------------------------------|------------------------|
| `apiNexus.env`        | Environment for documentation (Development, Qa, Staging, Production) | Development |
| `apiNexus.includeExample` | Include example documentation (true/false) | true                   |

### Authentication Configuration

| Variable                      | Description                                  | Default    |
|-------------------------------|----------------------------------------------|------------|
| `apiNexus.authentication.documentUser` | Document user for authentication           | test       |
| `apiNexus.authentication.documentPassword` | Document password for authentication   | test@123   |

### Info Configuration

| Variable              | Description                                | Default                |
|-----------------------|--------------------------------------------|------------------------|
| `apiNexus.info.title` | Title for the documentation                | Sample                 |
| `apiNexus.info.logo`  | Logo URL for the documentation             | [Default Logo URL]     |
| `apiNexus.info.includeDocumentType` | Include document type (graph/rest/both) | both                   |
| `apiNexus.info.introduction` | Introduction text for the main page   | [Default Introduction] |
| `apiNexus.info.graphDescription` | Description for GraphQL documentation  | [Default GraphQL Desc] |
| `apiNexus.info.restDescription` | Description for REST documentation      | [Default REST Desc]    |

## REST Configuration

### Schema Configuration

| Variable                | Description                           | Default           |
|-------------------------|---------------------------------------|-------------------|
| `apiNexus.rest.title`   | Title for REST documentation          | REST              |
| `apiNexus.rest.version` | Version of REST documentation         | 2.0.0             |
| `apiNexus.rest.description` | Description for REST documentation  | [Default REST Desc]|
| `apiNexus.rest.servers`  | Array of servers for REST API         | [List of servers] |

### GraphQL Configuration

### Schema Configuration

| Variable                  | Description                               | Default           |
|---------------------------|-------------------------------------------|-------------------|
| `apiNexus.graphQl.title`  | Title for GraphQL documentation           | GraphQL           |
| `apiNexus.graphQl.version`| Version of GraphQL documentation          | 2.1.0             |
| `apiNexus.graphQl.description` | Description for GraphQL documentation | [Default GraphQL Desc] |
| `apiNexus.graphQl.introspection` | Introspection URL for GraphQL        | [Default Introspection URL] |
| `apiNexus.graphQl.servers` | Array of servers for GraphQL API         | [List of servers] |

## Usage

- Follow the provided configuration options to customize your API Nexus documentation generation.
- Set environment variables or provide specific values for authentication and other parameters.

## Notes

- Ensure URLs and credentials are accessible and secure.
- Update the information in the configuration to match your specific API setup.


