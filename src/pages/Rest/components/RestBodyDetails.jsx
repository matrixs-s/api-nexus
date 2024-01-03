import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import parseNestedData from "../../../helpers/DataGenerator";

const RestBodyDetails = ({ apiBlock }) => {
  const bodyDataSet = apiBlock?.parameters?.bodyParams
    ? parseNestedData(apiBlock?.parameters?.bodyParams ?? {})
    : null;

  return bodyDataSet ? (
    <div>
      <h5>
        <i style={{ color: "red" }}>Body :-</i>
      </h5>
      <div style={{ maxHeight: "250px", overflow: "auto" }}>
        <SyntaxHighlighter language="json" style={vscDarkPlus}>
          {JSON.stringify(bodyDataSet || {}, null, 2)}
        </SyntaxHighlighter>
      </div>
    </div>
  ) : null;
};
export default RestBodyDetails;
