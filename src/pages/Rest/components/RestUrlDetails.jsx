import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import parseNestedData from "../../../helpers/DataGenerator";

const RestUrlDetails = ({ apiBlock }) => {
  const { method = null, url = null, parameters = null } = apiBlock;

  const path = Object.keys(parameters?.pathParams ?? {})
    .map((paramName) => `:${paramName}`)
    .join("/");

  const query = new URLSearchParams(
    parseNestedData(parameters?.queryParams)
  ).toString();

  return (
    <div>
      <h5>
        <i style={{ color: "red" }}>URL :-</i>
      </h5>
      <SyntaxHighlighter language="graphql" style={vscDarkPlus}>
        {`${method || ""} ${url || "URL Missing"}${
          path && url ? `/${path}` : ""
        }${query && url ? `?${query}` : ""}`?.trim()}
      </SyntaxHighlighter>
    </div>
  );
};
export default RestUrlDetails;
