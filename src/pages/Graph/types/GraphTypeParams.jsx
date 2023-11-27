import React from "react";
import Table from "react-bootstrap/Table";
import { introspectionTypeToString } from "../../../helpers/typeParser";
import "../../../css/Graph.css";

const GraphTypeParams = ({ apiBlock, graphMetaJson }) => {
  const paramsArray = {
    OBJECT: "fields",
    SCALAR: "inputFields",
    ENUM: "enumValues",
    INPUT_OBJECT: "inputFields",
    INTERFACE: "interfaces",
  };

  const { kind = null, name: apiName } = apiBlock;
  const argDescriptions = graphMetaJson?.[apiName]?.args ?? [];
  const parameters = apiBlock?.[paramsArray?.[kind]] ?? [];

  return (
    <div className="mb-3">
      <div>
        <h5>
          <i className="graph-heading">Arguments :-</i>
        </h5>
      </div>
      <div style={{ maxHeight: "300px", overflow: "auto" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ width: "10%" }}>#</th>
              <th style={{ width: "30%" }}>Name</th>
              <th style={{ width: "60%" }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {parameters?.length ? (
              (parameters ?? []).map((typeDetails, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {typeDetails.name}{" "}
                    <i className="graph-heading">
                      {introspectionTypeToString(typeDetails?.type)}
                    </i>
                  </td>
                  <td className="text-justify">
                    {argDescriptions?.[typeDetails?.name]?.description ??
                      typeDetails?.description}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>1</td>
                <td colSpan={2}>
                  <i className="graph-heading">
                    There are no Arguments for this API
                  </i>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
export default GraphTypeParams;
