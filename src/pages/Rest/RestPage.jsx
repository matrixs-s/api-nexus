import React from "react";
import DocumentHeader from "../../common/DocumentHeader";
import { Container } from "react-bootstrap";
import DocumentSidebar from "../../common/DocumentSidebar";
import { useDocumentContext } from "../../appContext"; // Adjust the path as needed

const RestPage = () => {
  const { restMetaJson: schemaJson = {}, config = {} } = useDocumentContext();
  const apiDetails = config?.apiNexus?.rest ?? {};

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
        <DocumentSidebar isGraph={false} listOptions={schemaJson} />
      </div>
    </>
  );
};

export default RestPage;
