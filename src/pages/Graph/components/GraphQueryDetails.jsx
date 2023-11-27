import React, { useState, useEffect, useRef } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import prettier from "prettier/standalone";
import GenerateQuery from "../../../helpers/GenerateQuery";
import CopyToClipboard from "react-copy-to-clipboard";
const graphqlParser = require("prettier/parser-graphql");

export default GraphQueryDetails = ({
  apiBlock: queryData,
  type: queryType,
}) => {
  const [code, setCode] = useState(null);
  const [isCopied, setCopied] = useState(false);

  const onCopy = () => {
    setCopied(!isCopied);
  };

  useEffect(async () => {
    const queryResult = await GenerateQuery(
      queryData,
      queryType?.toLowerCase()
    );
    const formattedData = await prettier.format(queryResult, {
      parser: "graphql",
      plugins: [graphqlParser],
    });
    setCode(formattedData);
  });

  return (
    <div>
      <h5>
        <i style={{ color: "red" }}>Query :-</i>
      </h5>
      <div style={{ position: "relative", marginTop: "15px" }}>
        <CopyToClipboard text={code} onCopy={onCopy}>
          <button
            style={{
              margin: "-0.5em 0px",
              ...(isCopied
                ? { backgroundColor: "green" }
                : { backgroundColor: "gray" }),
            }}
          >
            {!isCopied ? "Copy Code" : "Copied"}
          </button>
        </CopyToClipboard>
        <div style={{ maxHeight: "250px", overflow: "auto" }}>
          <SyntaxHighlighter language="graphql" style={vscDarkPlus}>
            {code || `Loading...`}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};
