import React, { useState } from "react";

const TreeNode = ({ label, data, expanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(expanded);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div
        onClick={toggleExpanded}
        className={`node-label ${isExpanded ? "expanded" : ""}`}
      >
        {isExpanded ? "▼" : "►"} {label}
      </div>
      {isExpanded && (
        <ul className="node-list">
          {Object.keys(data).map((key) => (
            <li key={key}>
              {typeof data[key] === "object" ? (
                <TreeNode label={key} data={data[key]} />
              ) : (
                `${key}: ${data[key]}`
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default TreeNode;
