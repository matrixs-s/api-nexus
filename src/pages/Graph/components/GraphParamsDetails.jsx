import React from "react";
import Table from "react-bootstrap/Table";
import { introspectionTypeToString } from "../../../helpers/typeParser";
import "../../../css/Graph.css";

const ApiParameters = ({ apiBlock, graphMetaJson, typeOnClick }) => {
  const { args = [], name: apiName } = apiBlock;
  const argDescriptions = graphMetaJson?.[apiName]?.args ?? [];

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
            {args?.length ? (
              args.map((arg, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {arg?.name}{" "}
                    <a href="#" onClick={() => typeOnClick(arg?.type)}>
                      <i className="graph-heading">
                        {introspectionTypeToString(arg?.type)}
                      </i>
                    </a>
                  </td>
                  <td className="text-justify">
                    {argDescriptions?.[arg?.name]?.description ??
                      arg?.description}
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
export default ApiParameters;
