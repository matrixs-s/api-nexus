api-nexus

Overview
api-nexus is a powerful tool for generating comprehensive API documentation for both RESTful and GraphQL APIs. With api-nexus, you can effortlessly create documentation that is both developer-friendly and user-friendly. Whether you are building REST APIs or GraphQL schemas, this tool streamlines the documentation process, ensuring clarity and consistency.

Features
Automatic Documentation Generation: Easily generate API documentation based on your RESTful endpoints and GraphQL schemas.
Separate REST and GraphQL Documentation: Create distinct documents for RESTful APIs and GraphQL APIs.
Developer-Friendly Markdown Format: The generated documentation is presented in Markdown format, making it easy to read and edit.
Customization Options: Customize the appearance and content of your API documentation to meet your project's specific needs.
Interactive GraphQL Playground: Include an interactive GraphQL Playground for users to experiment with queries.
Installation
Install api-nexus globally to use it as a command-line tool:

bash
Copy code
npm install -g api-nexus
Usage
Generate REST API Documentation
To generate documentation for your RESTful API, run the following command in your project directory:

bash
Copy code
api-nexus generate-rest-doc
This command will create a file named rest-api-doc.md in your project's root directory.

Generate GraphQL API Documentation
To generate documentation for your GraphQL API, run the following command:

bash
Copy code
api-nexus generate-graphql-doc
This will create a file named graphql-api-doc.md in your project's root directory.

Configuration
api-nexus can be configured using a configuration file. Create a file named api-nexus-config.json in your project's root directory with the following structure:

json
Copy code
{
  "outputDir": "./docs",
  "restApiDocFileName": "rest-api-doc.md",
  "graphqlApiDocFileName": "graphql-api-doc.md"
  // Add more configuration options as needed
}
