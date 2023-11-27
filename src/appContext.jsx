// Inbuilt modules
import React, { createContext, useContext, useMemo } from "react";

// Create a context
const DocumentContext = createContext();

// Create a custom provider component
export const DocumentContextProvider = ({ children, context }) => {
  const {
    __schema: { types },
  } = context?.introspection?.__schema
    ? context?.introspection
    : { __schema: { types: [] } };

  const schemaJson = useMemo(() => {
    return (types ?? []).reduce(
      (acc, data) => {
        if (["Query", "Mutation", "Subscription"].includes(data.name)) {
          acc.operations[data.name] = Object.assign(
            {},
            ...data.fields.map((apis) => {
              return { [apis.name]: apis };
            })
          );
        } else {
          acc.types.dataTypes[data.name] = data;
        }
        return acc;
      },
      { operations: {}, types: { dataTypes: {} } }
    );
  }, [types]);

  const graphMetaJson = useMemo(
    () => context.graphMetaData || {},
    [context.graphMetaData]
  );
  const restMetaJson = useMemo(
    () => context.restMetaData || {},
    [context.restMetaData]
  );
  const config = useMemo(() => context.config || {}, [context.config]);

  return (
    <DocumentContext.Provider
      value={{ config, schemaJson, graphMetaJson, restMetaJson }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

// Create a custom hook for accessing the context
export const useDocumentContext = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error(
      "useDocumentContext must be used within a DocumentContextProvider"
    );
  }
  return context;
};
