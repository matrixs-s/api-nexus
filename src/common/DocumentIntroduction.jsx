import React from "react";
import { useDocumentContext } from "../appContext"; // Adjust the path as needed
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Card, Row, Col } from "react-bootstrap";
import parse from "html-react-parser";
import "../css/Layout.css";

const DocumentIntroduction = ({ isGraph }) => {
  const { config } = useDocumentContext();
  const { env: environment = "Development [Default]" } = config?.apiNexus ?? {};
  const {
    title = "Sample",
    version = "1.1.0 [Default]",
    description = 'This comprehensive reference provides detailed information on the GraphQL <i>types</i>, <a href="#group-Operations-Queries"><i>queries</i></a>, <a href="#group-Operations-Mutations"><i>mutations</i></a>, <a href="#group-Operations-Subscriptions"><i>subscriptions</i></a>, and their respective parameters for interacting with the API and understanding the corresponding API responses.<i>[Default]<i> <br /> <br /> <h4>Follow these steps to add authentication:</h4>1. Go to the <a href="#mutation-login"><code>Login API</code></a> .<br />2. Enter your credentials<code>:</code> <br /> <code>"email":"youremail@domain.com"</code>, <code>"password":"your_password"</code>.<br /> 3. Copy the <code>token</code> from the response.<br />4. Add the token in the HTTP Headers using the following format.<br /><code>{"authorization":"token"}</code>',
    servers = [
      {
        url: "https://sample.com/api [Default]",
        env: "Development",
        headers: [
          {
            name: "Authorization [Default]",
            example: "<YOUR_TOKEN_HERE> [Default]",
            comment: "Use login token here for authorization [Default]",
          },
          {
            name: "Content-Type [Default]",
            example: "application/json [Default]",
            comment: "Header as application/json [Default]",
          },
        ],
      },
    ],
  } = config?.apiNexus?.[isGraph ? "graphQl" : "rest"] ?? {};

  const endPoints = (servers ?? []).find((server) =>
    server?.env === environment.includes("Not Specified")
      ? "Development"
      : environment
  );

  const renderApiInfo = (title, items) => {
    return (
      <div style={{ width: "80%" }}>
        <h4>{title}</h4>
        <SyntaxHighlighter language="html" style={vscDarkPlus}>
          {items.join("\n")}
        </SyntaxHighlighter>
      </div>
    );
  };

  return (
    <div className="introduction-card-container">
      <Card>
        <Card.Body>
          <Row className="text-justify">
            <Col md={6}>
              <Card.Title>
                <h1 style={{ textAlign: "left" }}>
                  <strong style={{ color: "#0066cc" }}>{title} </strong> API
                  References
                </h1>
              </Card.Title>
              <div className="card-text">
                <div>{parse(description)}</div>
              </div>
            </Col>
            <Col md={6} className="mt-3">
              {environment || version ? (
                <div
                  className="gridView"
                  style={{
                    width: "80%",
                  }}
                >
                  <div>
                    <h4>Environment</h4>
                    <p>
                      -{" "}
                      {environment.includes("Not Specified")
                        ? "Development [Default]"
                        : environment}
                    </p>
                  </div>
                  <div>
                    <h4>Version</h4>
                    <p>- {version}</p>
                  </div>
                </div>
              ) : null}
              {endPoints &&
                renderApiInfo("API Endpoints", [
                  `- ${endPoints?.env ?? "Development [Default]"}:\n - ${
                    endPoints?.url ?? "https://sample.com/api [Default]"
                  }`,
                ])}
              {endPoints?.headers &&
                renderApiInfo(
                  "Headers",
                  endPoints?.headers.map(
                    (header) =>
                      `# ${
                        header?.comment ?? "Use login token [Default]"
                      }\n - ${header?.name ?? "Authorization [Default]"}: ${
                        header?.example ?? "<YOUR_TOKEN_HERE> [Default]"
                      }`
                  )
                )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DocumentIntroduction;
