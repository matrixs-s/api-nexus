import React, { useState, useEffect, useRef } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import CopyToClipboard from "react-copy-to-clipboard";

export default AddResponses = ({ apiBlock, graphMetaJson }) => {
  const responseData = graphMetaJson?.[apiBlock?.name]?.response ?? {
    data: { [apiBlock?.name]: {} },
  };

  const [response, setResponse] = useState(null);
  const [isCopied, setCopied] = useState(false);

  const onCopy = () => {
    setCopied(!isCopied);
  };

  useEffect(async () => {
    setResponse(JSON.stringify(responseData, null, 2));
  });

  return (
    <div style={{ marginTop: "10px" }}>
      <h5>
        <i style={{ color: "red" }}>Response :-</i>
      </h5>
      <div style={{ position: "relative", marginTop: "15px" }}>
        <CopyToClipboard text={response} onCopy={onCopy}>
          <button
            style={{
              margin: "-0.5em 0px",
              ...(isCopied
                ? { backgroundColor: "green" }
                : { backgroundColor: "gray" }),
            }}
          >
            {!isCopied ? "Copy Response" : "Copied"}
          </button>
        </CopyToClipboard>
        <div style={{ maxHeight: "250px", overflow: "auto" }}>
          <SyntaxHighlighter language="json" style={vscDarkPlus}>
            {response || `Loading...`}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};
