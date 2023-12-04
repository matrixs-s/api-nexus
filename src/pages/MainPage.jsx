import React, { useEffect } from "react";
import { Container, Row, Card, Button } from "react-bootstrap";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useDocumentContext } from "../appContext";
import "../css/App.css";

export default function MainPage({ basePath }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (basePath === null || basePath === undefined) {
      navigate("/");
    }
  }, [navigate, basePath]);
  const { config } = useDocumentContext();
  const {
    title = "Sample",
    includeDocumentType = "both",
    introduction = "Our project, [Project Name], is a comprehensive document management platform designed to revolutionize the way organizations handle, store, and share documents. The purpose of this document is to provide a clear and concise overview of the project, its objectives, and the type of documents it caters to.[Default]",
    graphDescription = "Explore our GraphQL documentation for in-depth information on data retrieval, manipulation, and real-time updates. Gain insights into data types, parameters, and output specifics to enhance your API integration [Default]",
    restDescription = "Explore our Rest API documentation for in-depth information on data retrieval, manipulation, and real-time updates. Gain insights into data types, parameters, and output specifics to enhance your API integration [Default]",
    logo = null,
  } = config?.apiNexus?.info ?? {};

  const handleDocumentPath = (path) => {
    navigate(basePath ? `${basePath}/${path}` : path);
  };

  function renderCard(title, description, path) {
    return (
      <Card
        style={{
          maxHeight: "100vh",
          overflow: "auto",
          textAlign: "center",
          boxShadow: "0 51px 119px rgba(0, 0, 0, 0.1)",
          padding: "5%",
        }}
      >
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <div className="card-text">
            <div
              style={{
                height: "250px",
                overflow: "auto",
                textAlign: "justify",
                marginBottom: "5%",
                padding: "4%",
              }}
            >
              {description}
            </div>
            <p>
              <Button variant="info" onClick={() => handleDocumentPath(path)}>
                {title} Documentation
              </Button>
            </p>
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <div style={{ backgroundColor: "#f8f9fa !important" }}>
      <Container>
        <HelmetProvider>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{`${title} Documentation`}</title>
            <meta name="description" content={`${title} API Documentation`} />
          </Helmet>
        </HelmetProvider>
        <Row className="col-12">
          <Card
            className="card"
            style={{
              borderRadius: "3px",
              boxShadow: "0 28px 60px rgba(0, 0, 0, 0.1)",
              padding: "7% 7%",
            }}
          >
            <h1 style={{ textAlign: "center" }}>
              <img
                src={logo}
                alt="Logo"
                className="logo"
                style={{ width: "164px", height: "auto" }}
              />
            </h1>
            <hr></hr>
            <Card.Body>
              <Card.Title className="cardTitle" style={{ fontSize: "x-large" }}>
                {`${title} API Documentation`}
              </Card.Title>
              <div
                className="card-text cardText"
                style={{ textAlign: "justify" }}
              >
                <div className="cardText">{introduction}</div>
                <Row>
                  {includeDocumentType === "both" ||
                  includeDocumentType === "graph" ? (
                    <div
                      className={
                        includeDocumentType !== "both"
                          ? "col-md-8 mx-auto"
                          : "col-md-6"
                      }
                    >
                      {renderCard(
                        "GraphQL API",
                        graphDescription,
                        "graphql_api"
                      )}
                    </div>
                  ) : null}
                  {includeDocumentType === "both" ||
                  includeDocumentType === "rest" ? (
                    <div
                      className={
                        includeDocumentType !== "both"
                          ? "col-md-8 mx-auto"
                          : "col-md-6"
                      }
                    >
                      {renderCard("Rest API", restDescription, "rest_api")}
                    </div>
                  ) : null}
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div>
  );
}
