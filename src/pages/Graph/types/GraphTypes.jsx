import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import GraphTypeParams from "./GraphTypeParams";
import GraphTypeResponse from "./GraphTypeResponse";
import { useDocumentContext } from "../../../appContext"; // Adjust the path as needed

export default GraphTypes = ({ apiContent, type }) => {
  console.log("-- [GraphTypes] ", apiContent, "[Types]", type);
  const { graphMetaJson: customDataset = {} } = useDocumentContext();

  const ApiDescription = ({ apiBlock }) => {
    const description =
      customDataset?.[type?.toLowerCase()]?.[apiBlock?.name]?.apiDescription ||
      apiBlock?.description ||
      `Get the details of ${apiBlock?.name ?? "type"}`;

    return (
      <div className="mb-3">
        <div>
          <h5>
            <i className="graph-heading">Description :-</i>
          </h5>
        </div>
        <div className="text-justify">
          <span>{description}</span>
        </div>
      </div>
    );
  };

  return (
    <>
      {Object.keys(apiContent || {})?.length ? (
        <div
          style={{
            padding: "15px",
            backgroundColor: "#f9f5f5",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 4px 62px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <h5>
            <i style={{ color: "red" }}>{type}</i>
          </h5>
        </div>
      ) : null}
      <div style={{ position: "relative", marginTop: "15px" }}>
        {Object.keys(apiContent || {}).length
          ? Object.keys(apiContent || {}).map((typeDataset, index) => (
              <div key={`type_${index}`} style={{ textAlign: "left" }}>
                <Card>
                  <Card.Body>
                    <Row>
                      <Col md={6}>
                        <Card.Title>
                          <p>
                            <b>## {apiContent[typeDataset]?.name ?? "NA"} ##</b>
                          </p>
                        </Card.Title>
                        <div>
                          <ApiDescription apiBlock={apiContent[typeDataset]} />
                          <GraphTypeParams
                            apiBlock={apiContent[typeDataset]}
                            graphMetaJson={customDataset?.[type?.toLowerCase()]}
                          />
                        </div>
                      </Col>
                      <Col md={6}>
                        <div style={{ width: "80%", margin: "left" }}>
                          <GraphTypeResponse
                            apiBlock={apiContent[typeDataset]}
                            graphMetaJson={customDataset?.[type?.toLowerCase()]}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </div>
            ))
          : null}
      </div>
    </>
  );
};
