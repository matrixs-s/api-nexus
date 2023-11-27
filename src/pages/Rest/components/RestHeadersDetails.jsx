import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const RestHeadersDetails = ({ apiBlock }) => {
  return apiBlock?.headers &&
    Object.keys(apiBlock?.headers || {})?.length > 0 ? (
    <div>
      <h5>
        <i style={{ color: "red" }}>Headers :-</i>
      </h5>
      <SyntaxHighlighter language="json" style={vscDarkPlus}>
        {JSON.stringify(apiBlock?.headers || {}, null, 2)}
      </SyntaxHighlighter>
    </div>
  ) : null;
};
export default RestHeadersDetails;
