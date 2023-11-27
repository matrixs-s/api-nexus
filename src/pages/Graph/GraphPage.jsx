import React from "react";
import DocumentHeader from "../../common/DocumentHeader";
import { Container } from "react-bootstrap";
import DocumentSidebar from "../../common/DocumentSidebar";
import { useDocumentContext } from "../../appContext"; // Adjust the path as needed

const GraphPage = () => {
  const { schemaJson = {}, config = {} } = useDocumentContext();
  const apiDetails = config?.apiNexus?.graphQl ?? {};
  return (
    <>
      <Container fluid>
        <DocumentHeader
          apiDetails={apiDetails}
          logo={config?.apiNexus?.info?.logo ?? null}
        />
      </Container>
      <div
        className="row m-0"
        style={{ minHeight: "100vh", backgroundColor: "white" }}
      >
        <DocumentSidebar isGraph={true} listOptions={schemaJson} />
      </div>
    </>
  );
};

export default GraphPage;
