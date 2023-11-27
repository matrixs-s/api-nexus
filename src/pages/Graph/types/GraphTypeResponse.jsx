import React, { useState, useEffect, useRef } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import CopyToClipboard from "react-copy-to-clipboard";
import parseGraphData from "../../../helpers/parseGraphData";

export default GraphTypeResponse = ({ apiBlock, graphMetaJson }) => {
  const [responseData, setResponseData] = useState(null);
  const [isCopied, setCopied] = useState(false);

  useEffect(() => {
    const paramsArray = {
      OBJECT: "fields",
      SCALAR: "inputFields",
      ENUM: "enumValues",
      INPUT_OBJECT: "inputFields",
      INTERFACE: "interfaces",
    };

    const { kind = null, name: apiName } = apiBlock;
    const customResponse = graphMetaJson?.[apiName]?.response ?? null;
    const fetchData = async () => {
      if (!customResponse) {
        const parameters = apiBlock?.[paramsArray[kind]] || [];
        const data = await parseGraphData(
          parameters,
          apiBlock?.kind,
          apiBlock?.name
        );
        setResponseData(JSON.stringify(data || {}, null, 2));
      } else {
        setResponseData(JSON.stringify(customResponse || {}, null, 2));
      }
    };

    fetchData();
  }, [apiBlock]);

  const onCopy = () => {
    setCopied(!isCopied);
  };

  return (
    <>
      <h5>
        <i style={{ color: "red" }}>Example :-</i>
      </h5>
      <div style={{ position: "relative", marginTop: "15px" }}>
        <CopyToClipboard text={responseData} onCopy={onCopy}>
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
        <div
          style={{
            maxHeight: "350px",
            overflow: "auto",
          }}
        >
          <SyntaxHighlighter language="json" style={vscDarkPlus}>
            {responseData || `Loading...`}
          </SyntaxHighlighter>
        </div>
      </div>
    </>
  );
};
