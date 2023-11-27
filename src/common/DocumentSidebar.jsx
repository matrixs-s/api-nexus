import React, { useState, useCallback, useRef } from "react";
import { ListGroup } from "react-bootstrap";
import DocumentApiGroups from "./DocumentApiGroups";
import DocumentIntroduction from "./DocumentIntroduction";
import RestMainContent from "../pages/Rest/components/RestMainContent";
import GraphMainContent from "../pages/Graph/components/GraphMainContent";
import "../css/Layout.css";
import GraphTypes from "../pages/Graph/types/GraphTypes";

const DocumentSidebar = ({ isGraph, listOptions }) => {
  const [operationType, setOperationType] = useState(null);
  const [outputType, setOutputType] = useState(null);
  const listRef = useRef(null);

  const handleListItemClick = (index) => {
    const listItem = listRef?.current?.children?.[index] ?? null;
    if (listItem) {
      listItem.scrollIntoView({ behavior: "auto", block: "start" });
    }
  };

  const lowerCamelToTitleCase = (lowerCamel) => {
    return lowerCamel
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^./, (firstLetter) => firstLetter.toUpperCase())
      .trim();
  };

  const handleSourceType = useCallback(
    (newState, apiNames) => {
      if (newState === "dataTypes" && isGraph) {
        setOutputType({ [newState]: apiNames });
      } else {
        setOperationType({ [newState]: apiNames });
      }
    },
    [setOutputType, setOperationType]
  );

  return (
    <>
      <div className="col-2 sidebar-container">
        {listOptions && Object.keys(listOptions || {})?.length > 0 ? (
          Object.keys(listOptions || {}).map((listHead, index) => (
            <ListGroup
              className="main-option-list sidebar-main-option-list"
              key={index}
            >
              <ListGroup.Item className="list-group-item-header">
                {lowerCamelToTitleCase(listHead)}
                <hr></hr>
                {listOptions?.[listHead] ? (
                  <DocumentApiGroups
                    key={index}
                    isGraph={isGraph}
                    listGroups={listOptions[listHead]}
                    handleSourceType={handleSourceType}
                    handleListItemClick={handleListItemClick}
                  />
                ) : (
                  <p className="error-message">
                    ► No {!isGraph ? "REST" : "GraphQL"} module details
                    available in the Documentation.
                  </p>
                )}
              </ListGroup.Item>
            </ListGroup>
          ))
        ) : (
          <p className="error-message">
            ► No {!isGraph ? "REST Endpoint" : "GraphQL Operation"} details
            available in the setup meta json file.
          </p>
        )}
      </div>
      {operationType ? (
        <div className="col-10 sidebar-content-container">
          <DocumentIntroduction isGraph={isGraph} />
          <div>
            {!isGraph ? (
              <RestMainContent
                apiContent={Object.values(operationType)[0]}
                type={Object.keys(operationType)[0]}
                focusRef={listRef}
              />
            ) : isGraph ? (
              <GraphMainContent
                apiContent={Object.values(operationType)[0]}
                type={Object.keys(operationType)[0]}
                focusRef={listRef}
              />
            ) : (
              <h3 className="text-danger loading-message">
                {" "}
                Content Loading...
              </h3>
            )}
          </div>
          {/* Add types if exists */}
          <div>
            {isGraph && outputType && outputType?.dataTypes ? (
              <GraphTypes
                apiContent={Object.values(outputType)[0]}
                type={Object.keys(outputType)[0]}
                focusRef={listRef}
              />
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DocumentSidebar;
