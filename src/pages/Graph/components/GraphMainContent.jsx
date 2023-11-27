import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useDocumentContext } from "../../../appContext"; // Adjust the path as needed
import { introspectionTypeToString } from "../../../helpers/typeParser";
import ApiParameters from "./GraphParamsDetails";
import GraphQueryDetails from "./GraphQueryDetails";
import GraphResponseDetails from "./GraphResponseDetails";
import "../../../css/Graph.css";

const GraphMainContent = ({ apiContent, type, focusRef }) => {
  // console.log("[GraphMainContent]", apiContent, "Graphql-group-options", type);
  const { graphMetaJson: customDataset = {} } = useDocumentContext();

  const ApiDescription = ({ apiBlock }) => {
    const description =
      customDataset?.[type?.toLowerCase()]?.[apiBlock?.name]?.apiDescription ||
      apiBlock?.description ||
      `Get the details of ${apiBlock?.name ?? "API"}`;

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

  const ApiOutput = ({ apiBlock }) => (
    <div className="mb-3">
      <div>
        <h5>
          <i className="graph-heading">Output :-</i>
        </h5>
      </div>
      <div>
        <span>
          it <i style={{ color: "blue" }}>returns</i> output of type{" "}
          {/* Default output type is JSON */}
          <span className="graph-heading">
            {introspectionTypeToString(
              apiBlock?.type || {
                kind: "SCALAR",
                name: "JSON",
                ofType: null,
              }
            )}
          </span>
        </span>
      </div>
    </div>
  );

  return (
    <>
      <div ref={focusRef}>
        {apiContent && Object.keys(apiContent || {})?.length ? (
          Object.keys(apiContent || {}).map((apiBlock, index) => (
            <div key={`rest_${index}`} style={{ textAlign: "left" }}>
              <Card>
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <Card.Title>
                        <p>
                          <b>## {apiContent?.[apiBlock]?.name ?? "NA"} ##</b>
                        </p>
                      </Card.Title>
                      <div>
                        <ApiDescription apiBlock={apiContent?.[apiBlock]} />
                        <ApiOutput apiBlock={apiContent?.[apiBlock]} />
                        <ApiParameters
                          apiBlock={apiContent?.[apiBlock]}
                          graphMetaJson={customDataset?.[type?.toLowerCase()]}
                        />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div style={{ width: "80%", margin: "left" }}>
                        <GraphQueryDetails
                          apiBlock={apiContent?.[apiBlock]}
                          type={type?.toLowerCase()}
                        />
                        <GraphResponseDetails
                          apiBlock={apiContent?.[apiBlock]}
                          graphMetaJson={customDataset?.[type?.toLowerCase()]}
                        />
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <div className="graph-main-content-error">
            <h3>
              ► There are no details for the content to display in the graph
              meta file
            </h3>
          </div>
        )}
      </div>
    </>
  );
};

export default GraphMainContent;
