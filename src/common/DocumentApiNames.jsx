import React from "react";
import { ListGroup } from "react-bootstrap";
import "../css/Layout.css";

const DocumentApiNames = ({
  apiNames,
  isTrue,
  expandedItem,
  onButtonClick,
}) => {
  if (!apiNames || Object.keys(apiNames || {})?.length === 0) {
    return (
      <ListGroup.Item className="error-message">
        ► No APIs are defined for the module [{expandedItem}] in the set up meta
        json file
      </ListGroup.Item>
    );
  }

  return (
    <>
      <div className="api-names-container">
        {isTrue &&
          Object.keys(apiNames || {}).map((apiName, index) => {
            return (
              <div key={`api_name_${index}`}>
                <ListGroup.Item
                  className="special"
                  onClick={() => onButtonClick(index, apiNames, expandedItem)}
                >
                  {apiName}
                </ListGroup.Item>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default DocumentApiNames;
