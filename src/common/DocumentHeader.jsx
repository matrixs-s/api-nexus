import React from "react";
import { Row, Col } from "react-bootstrap";
import "../css/Layout.css";

const DocumentHeader = ({ apiDetails, logo }) => {
  return (
    <Row className="document-header">
      <Col md={2} className="text-center font-weight-bold">
        <img src={logo} alt="Logo" className="document-logo" />
      </Col>
      <Col className="text-center font-weight-bold">
        <h2 className="font-weight-bold">
          {apiDetails?.title ?? "Sample"} API Documentation
        </h2>
      </Col>
    </Row>
  );
};

export default DocumentHeader;
