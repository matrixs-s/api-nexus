# api-nexus



[![npm](https://img.shields.io/npm/v/api-nexus)](https://www.npmjs.com/package/api-nexus)

[![npm](https://img.shields.io/npm/dw/api-nexus)](https://www.npmjs.com/package/api-nexus)

[![GitHub](https://img.shields.io/github/license/your-username/api-nexus)](https://github.com/your-username/api-nexus/blob/main/LICENSE)

## Overview
![Api-nexus](https://github.com/matrixs-s/api-nexus/raw/master/public/images/api-nexus-logo.png) <br />

<font  color="red">**api-nexus**</font> is a powerful tool for effortlessly generating comprehensive API documentation for both RESTful and GraphQL APIs. Whether you are building <font  color="red">**REST APIs**</font> or <font  color="red">**GraphQL schemas**</font>, this tool streamlines the documentation process, ensuring clarity and consistency.

**Required**
Node Version => <font  color="red"> 16.0.0</font>

## Features

-  **Automatic Documentation Generation:** Easily generate API documentation based on your RESTful endpoints and GraphQL schemas.

-  **Separate REST and GraphQL Documentation:** Create distinct documents for RESTful APIs and GraphQL APIs.

-  **Developer-Friendly Markdown Format:** The generated documentation is presented in Markdown format, making it easy to read and edit.

-  **Customization Options:** Customize the appearance and content of your API documentation to meet your project's specific needs.

-  **Interactive GraphQL Playground:** Include an interactive GraphQL Playground for users to experiment with queries.


## Documentation View

<p  align="center">
<img  src="https://github.com/matrixs-s/api-nexus/raw/master/public/images/login-page.png"  alt="Login Page"  width="400"  height="260"/>
<img  src="https://github.com/matrixs-s/api-nexus/raw/master/public/images/landing-page.png"  alt="Landing Page"  width="400"  height="260"/>
<img  src="https://github.com/matrixs-s/api-nexus/raw/master/public/images/rest-apis.png"  alt="Rest Page"  width="400"  height="260"/>
<img  src="https://github.com/matrixs-s/api-nexus/raw/master/public/images/graph-apis.png"  alt="Graph Page"  width="400"  height="260"/>
</p>

## 1. Getting Started

### Step 1: **Install api-nexus**
- Use the following command to install the *api-nexus* package in your project:
    ```bash

    > npm install -g api-nexus
                OR
    > npm install api-nexus

    ```
### **Step 2: Create a Config.yml File**

- Create a <font  color="red">  `config.yml`</font> file in the root directory of your project. For an example configuration, refer to the [ [config.yml Example here ](https://github.com/matrixs-s/api-nexus/blob/master/config.yml)]

### **Step 3: Set Environment Variables**

- Create a <font  color="red">`.env`  </font>file in the project root directory and export the following environment variables:

    ```bash
    DOC_USER=test
    DOC_PASSWORD=test
    DOC_ENV=Development
    DOC_PORT=3001
    ```
#### Explanation:

- If authentication is defined in your <font  color="red">*`config.yml`,*  </font> provide the following environment variables:
    -  `DOC_USER=test`
    -  `DOC_PASSWORD=test`
- The default server port is 3001. If you want to use a different port, set it with the <font  color="orange">`DOC_PORT`</font> environment variable:
    -  `DOC_PORT=4000`
- Add the environment for which you want to create the documentation:
    -  `DOC_ENV=Development`


### **Step 4: Update Package.json**

- Add the following command in your <font  color="red">  `package.json`  </font> to create the api documentation:
    ```bash
    "scripts": {
        "build-api-documentation": "npm explore api-nexus -- npm run build-api-documentation",
        "start": "node app.js"
    }
    ```

### Step 5: Generate Documentation

- Run the following command to generate the documentation files:
    ```bash
    > npm run build-api-documentation
    ```

### **Step 6: Verify Generated Files**

- After running the command, a <font  color="red">  `doc`  </font> folder will be created in the root directory with the following structure:
    ```bash
        doc
        ├── build
        ├── dist
        ├── graph
        │ ├── introspection.json
        │ └── graphMetaData.json
        │
        └── rest
            └── restMetaData.json
    ```

-  <font  color="red">**Note**</font>: These files are auto-generated, and renaming them may cause issues in document generation.You can also create this folder structure in the root project directory manual to run the document.

- [[Introspection JSON Example here](https://matrixs-s@github.com/matrixs-s/api-nexus/blob/master/examples/introspection.json)]
- [[graphMetaData JSON Example here](https://matrixs-s@github.com/matrixs-s/api-nexus/blob/master/examples/graphMetaData.json)]
- [[restMetaData JSON Example here](https://matrixs-s@github.com/matrixs-s/api-nexus/blob/master/examples/restMetaData.json)]


### **Step 7: Include Code Lines in Your Project**

- Include the following code lines in your project to enable the documentation:

    ```bash
    const express = require("express");
    const app = express();
    const path = require("path");

    # Include these lines of code
    const documentApi = require(path.join(__dirname,  "doc",  "build",  "server.js"));
    documentApi('/api/my-app/document')

    app.get("/health",  async (req, res) => {
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

-  <font  color="red">**Note** </font> : Adjust the `path` variable to set the base path at which your document will be visible. For example, <font  color="orange">`/api/document` </font>,<font  color="orange"> `/api-project/document`, </font> etc.


### **Step 8: Access Document Server**

- You can access the document server at the following URL with the specified base path:

	```bash
	>`domain:3001/api/my-app/document`
	```
-  <font  color="red">**Note**</font>: If you have set the port to 4000, the URL will be accessible at <font  color="orange">`domain:4000/api/my-app/document`</font>.



## 2. Getting Started With Docker & Nginx

- Steps to setup through docker & nginx to run both ports on your domain

	### Step 1: Create a Dockerfile
	- Create a docker file in the project root directory

	### Step 2: Docker Configuration
	- Add the below configuratio to the docker file

        ```bash
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
        COPY .  .
        # Expose the necessary ports
        EXPOSE 3000
        EXPOSE 3001
        # Run the application
        CMD ["npm", "start"]
        ```

	### Step 3: Nginx Setup

	- Create the below setup for the server proxy using Nginx:
        ```bash
        server {
            server_name my-domain;
            client_max_body_size 1024m;
            location /api/document {
            proxy_pass http://my-domain:3004/api/document;
            proxy_http_version 1.1;
            proxy_set_header Host $http_host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
        }

        location / {
            proxy_pass http://my-domain:3002;
            proxy_http_version 1.1;
            proxy_set_header Host $http_host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            }
        }
        ```
	-  ### Explanation

        - Let's consider you set the base URL as<font  color="orange">  `/api/document`</font> using the <font  color="red">`documentApi('/api/document')`  </font>configuration in your application.

        - Now, in the Nginx setup, the <font  color="orange">`location /api/document`  </font>block is configured to handle requests for<font  color="red">  `/api/document`.</font> This block uses `proxy_pass` to direct these requests to the document API server, which is assumed to be running on port 3001 and mapped to port 3004 using the Docker command:

            ```bash
            > sudo docker run -it -p 3002:3000 -p 3004:3001 api-nexus
            ```
        - So, the `proxy_pass` in the Nginx configuration becomes <font  color="orange">`http://my-domain/api/document`</font>.You can handle other base URLs in a similar way by creating additional `location` blocks in the Nginx configuration, allowing you to route different parts of your application to various backend servers based on your requirements. Adjust the port numbers and base URLs accordingly for your specific setup.

## 3. Getting Started With Http-Proxies

- If you prefer not to use Nginx for proxying, follow the steps below to serve the document using the HTTP proxy instead.

	```bash
	const express = require("express");
	const app = express();
	const path = require("path");
	const { createProxyMiddleware  }  =  require("http-proxy-middleware");

	# Include the API Nexus documentation server
	const documentApi = require(path.join(__dirname,  "doc",  "build",  "server.js"));
	documentApi('/api/document');

	# Create a proxy middleware for the "/api/document" route
	const documentProxy = createProxyMiddleware({
		target:  "http://domain:3001",  //  Replace  with  the  actual  destination  server  URL
		changeOrigin: true,
	});

	# Use the proxy middleware for the "/api/document" route
	app.use("/api/document",  documentProxy);

	app.get("/health",  async (req, res) => {
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
- With the above http proxy setup you can access the api-documentation at <font  color="orange">domain:3000/api/document</font>.With the above setup you can access both the API with the same port.

### **Config.yml Options**

| Variable | Default | Description |
|-----------------------------|-----------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| | <center>**API Nexus**</center> | |
| <font color="orange">env</font> | ${DOC_ENV} | Specify the environment for documentation (Development, Qa, Staging, Production) |
| <font color="orange">includeExample</font> | true | Include example (true/false) [default=true] |
| | <center>**Authentication**</center> | |
| <font color="orange">documentUser</font> | ${DOC_USER} | Default user is - [documentUser=test] |
| <font color="orange">documentPassword</font> | ${DOC_PASSWORD} | Default password is - [documentPassword=test@123] |
| | <center>**Info**</center> | |
| <font color="orange">title</font> | Sample | Title for the main page [default=Sample] |
| <font color="orange">logo</font> | [![Logo](https://github.com/matrixs-s/api-nexus/raw/master/public/images/api-nexus-logo.png)](Default=Logo) | URL for the logo image [default=Logo] |
| <font color="orange">includeDocumentType</font> | both | Include document type (graph, rest, both) [default=both] |
| <font color="orange">introduction</font> | Welcome to our comprehensive guide on Application Programming Interfaces (APIs). ... | Introduction for the main page |
| <font color="orange">graphDescription</font> | Welcome to the GraphQL API Overview, your gateway to the future of data querying ... | Description for GraphQL API [default=some description] |
| <font color="orange">restDescription</font> | Welcome to the REST API Overview, your comprehensive resource for understanding and working ... | Description for REST API [default=some description] |
| | <center>**REST**</center> | |
| <font color="orange">title</font> | REST | [default=Sample] |
| <font color="orange">version</font> | 2.0.0 | [default=1.0.0] |
| <font color="orange">description</font> | This comprehensive reference provides detailed information on the GraphQL <i>types</i>, ... | Description for REST API [default=Some description] |
| | <center>**Servers**</center> | |
| <font color="orange">url</font> | https://sample-dev.com/api/rest | Server URL for REST API |
| <font color="orange">env</font> | Development | Environment for the server |
| <font color="orange">headers</font> | Authorization: <YOUR_TOKEN_HERE> | Headers for the server |
| | <center>**GraphQL**</center> | |
| <font color="orange">title</font> | GraphQL | [default=Sample] |
| <font color="orange">version</font> | 2.1.0 | [default=1.0.0] |
| <font color="orange">description</font> | This comprehensive reference provides detailed information on the GraphQL <i>types</i>, ... | Description for GraphQL API [default=Some description] |
| | <center>**GraphQL Introspection**</center> | |
| <font color="orange">url</font> | https://sample-dev.com/api/graphql | URL for GraphQL introspection [Make sure it is accessible and allowed to access] |
| <font color="orange">overWriteEachTime</font> | false | Overwrite introspection each time [default=false] |
| | <center>**GraphQL Servers**</center> | |
| <font color="orange">url</font> | https://sample-dev.com/api/graphql/dev | Server URL for GraphQL API (Development) |
| <font color="orange">env</font> | Development | Environment for the server |
| <font color="orange">headers</font> | Authorization: <YOUR_TOKEN_HERE>, Content-Type: "application/json" | Headers for the server (Development) |

**Note**: You can replace `<YOUR_TOKEN_HERE>` with the actual token. The URLs and other values should be adjusted based on your specific configuration.