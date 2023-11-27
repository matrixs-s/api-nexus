import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import TreeNode from "./RestParamsDetails";
import RestUrlDetails from "./RestUrlDetails";
import RestHeadersDetails from "./RestHeadersDetails";
import RestBodyDetails from "./RestBodyDetails";
import RestResponseDetails from "./RestResponseDetails";
import "../../../css/TreeView.css";
import "../../../css/Rest.css";

const RestMainContent = ({ apiContent, type, focusRef }) => {
  console.log("[RestMainContent]", apiContent, "-- RestMain-Group-type", type);
  
  const lowerCamelToTitleCase = (lowerCamel) => {
    return lowerCamel
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^./, (firstLetter) => firstLetter.toUpperCase())
      .trim();
  };

  const ApiDescription = ({ apiBlock }) => {
    const description =
      apiBlock?.apiDescription || `Get the details of ${apiBlock?.name}`;

    return (
      <div className="mb-3">
        <div>
          <h5>
            <i className="rest-heading">Description :-</i>
          </h5>
        </div>
        <div>
          <span>{description}</span>
        </div>
      </div>
    );
  };

  const ApiOutput = ({ apiBlock }) => {
    const outputType = apiBlock?.outputType || "JSON";

    return (
      <div className="mb-3">
        <div>
          <h5>
            <i className="rest-heading">Output :-</i>
          </h5>
        </div>
        <div>
          <span>
            it <i style={{ color: "blue" }}>returns</i> output of type{" "}
            <span className="rest-heading">{outputType}</span>
          </span>
        </div>
      </div>
    );
  };

  const ApiParameters = ({ apiBlock }) => {
    return apiBlock?.parameters &&
      Object.keys(apiBlock?.parameters || {})?.length ? (
      <div className="mb-3">
        <div>
          <h5>
            <i className="rest-heading">Parameters :-</i>
          </h5>
        </div>
        <div
          className="tree-container"
          style={{ width: "80%", marginLeft: "0px" }}
        >
          <div className="syntax-highlighter">
            {Object.keys(apiBlock?.parameters || {}).map(
              (requestParams, index) => {
                return (
                  <TreeNode
                    label={lowerCamelToTitleCase(requestParams)}
                    data={apiBlock?.parameters?.[requestParams]}
                    expanded={true}
                    key={`params_${index}`}
                  />
                );
              }
            )}
          </div>
        </div>
      </div>
    ) : null;
  };

  return (
    <>
      <div ref={focusRef}>
        {apiContent && Object.keys(apiContent || {})?.length ? (
          Object.keys(apiContent || {}).map((apiBlock, index) => (
            <div key={`rest_${index}`} className="rest-main-container">
              <Card>
                <Card.Body>
                  <Row>
                    <Card.Title className="col-md-12">
                      <p>
                        <b>## {apiContent?.[apiBlock]?.name} ##</b>
                      </p>
                    </Card.Title>
                    <Col md={6}>
                      <div>
                        <ApiDescription apiBlock={apiContent?.[apiBlock]} />
                        <ApiOutput apiBlock={apiContent?.[apiBlock]} />
                        <ApiParameters apiBlock={apiContent?.[apiBlock]} />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div style={{ width: "80%", margin: "left" }}>
                        <RestUrlDetails apiBlock={apiContent?.[apiBlock]} />
                        <RestHeadersDetails apiBlock={apiContent?.[apiBlock]} />
                        <RestBodyDetails apiBlock={apiContent?.[apiBlock]} />
                        <RestResponseDetails
                          apiBlock={apiContent?.[apiBlock]}
                        />
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <div className="rest-main-content-error">
            <h3>
              There are no details for the content to display in the project
              meta file
            </h3>
          </div>
        )}
      </div>
    </>
  );
};

export default RestMainContent;
