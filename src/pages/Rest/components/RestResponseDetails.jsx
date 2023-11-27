import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const RestBodyDetails = ({ apiBlock }) => {
  return (
    <div>
      <h5>
        <i style={{ color: "red", fontWeight: "bold" }}>Response :-</i>
      </h5>
      <SyntaxHighlighter language="json" style={vscDarkPlus}>
        {JSON.stringify(apiBlock?.response || { data: {} }, null, 2)}
      </SyntaxHighlighter>
    </div>
  );
};
export default RestBodyDetails;
