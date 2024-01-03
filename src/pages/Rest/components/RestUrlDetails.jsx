import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import parseNestedData from "../../../helpers/DataGenerator";
import { useDocumentContext } from "../../../appContext"; // Adjust the path as needed

const RestUrlDetails = ({ apiBlock }) => {
  const { method = null, url = null, parameters = null } = apiBlock;
  const { config } = useDocumentContext();

  const { env: environment = "Development", rest: { servers = [] } = {} } =
    config?.apiNexus ?? {};

  const endPoints = (servers ?? []).find((server) =>
    server?.env === environment.includes("Not Specified")
      ? "Development"
      : environment
  );

  const path = Object.keys(parseNestedData(parameters?.pathParams) ?? {})
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
        {`${method || ""} ${
          url ? `${endPoints?.url ?? ""}${url}` : "URL Missing"
        }${path && url ? `/${path}` : ""}${
          query && url ? `?${query}` : ""
        }`?.trim()}
      </SyntaxHighlighter>
    </div>
  );
};
export default RestUrlDetails;
