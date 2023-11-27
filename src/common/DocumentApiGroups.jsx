import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import DocumentApiNames from "./DocumentApiNames";
import { memo } from "react";

const DocumentApiGroups = ({
  listGroups,
  isGraph,
  handleSourceType,
  handleListItemClick,
}) => {
  console.log(
    "[DocumentApiGroups] --> [Options] --> [QUERY,MUTATION,SUBSCRIPTION],[GET,PUT,POST]",
    isGraph
  );
  const [expandedItem, setExpandedItem] = useState(
    Object.keys(listGroups || {})?.[0] || null
  );

  const lowerCamelToTitleCase = (lowerCamel) => {
    return lowerCamel
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^./, (firstLetter) => firstLetter.toUpperCase())
      .trim();
  };
 
  useEffect(() => {
    const fetchData = async (expandedItem) => {
      handleSourceType(expandedItem, listGroups[expandedItem]);
    };
    fetchData(expandedItem);
  }, [listGroups, handleSourceType, expandedItem]);

  if (!listGroups || Object.keys(listGroups || {})?.length === 0) {
    // Handle the case when listGroups is missing or empty
    return (
      <ListGroup
        className="main-option-list"
        style={{ width: "100%", color: "red" }}
      >
        <ListGroup.Item style={{ padding: "5px" }}>
          ► No {!isGraph ? "REST" : "GraphQL"} modules available.
        </ListGroup.Item>
      </ListGroup>
    );
  }

  // listGroups like Query,Mutation,Subscription
  return (
    <>
      <ListGroup className="main-option-list">
        {Object.keys(listGroups || {}).map((subHead, index) => {
          return (
            <div key={`group_${index}`}>
              <ListGroup.Item
                style={{
                  ...(expandedItem === subHead
                    ? {
                        backgroundColor: "#e9e9f2",
                        padding: "10px",
                        cursor: "pointer",
                      }
                    : { padding: "10px", cursor: "pointer" }),
                }}
                onClick={() => setExpandedItem(subHead)}
              >
                {expandedItem === subHead ? "▼  " : "►  "}
                {lowerCamelToTitleCase(subHead)}
                {subHead === expandedItem && listGroups?.[subHead] ? (
                  <DocumentApiNames
                    apiNames={listGroups?.[subHead]}
                    isTrue={expandedItem === subHead}
                    expandedItem={expandedItem}
                    onButtonClick={handleListItemClick}
                  />
                ) : null}
              </ListGroup.Item>
            </div>
          );
        })}
      </ListGroup>
    </>
  );
};

export default memo(DocumentApiGroups);
