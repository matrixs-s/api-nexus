import fsPromises from "fs/promises";
import { existsSync, mkdirSync } from "fs";
import path from "path";
import yaml from "js-yaml";
import fetch from "node-fetch";

const docFolder = path.join(process.cwd(), "doc", "data-sources");

const introspectionQuery = `
query IntrospectionQuery {
    __schema {
      queryType {
        name
      }
      mutationType {
        name
      }
      subscriptionType {
        name
      }
      types {
        ...FullType
      }
      directives {
        name
        description
        locations
        args {
          ...InputValue
        }
      }
    }
  }
  
  fragment FullType on __Type {
    kind
    name
    description
    fields {
      name
      description
      args {
        ...InputValue
      }
      type {
        ...TypeRef
      }
    }
    inputFields {
      ...InputValue
    }
    interfaces {
      ...TypeRef
    }
    enumValues {
      name
      description
    }
    possibleTypes {
      ...TypeRef
    }
  }
  
  fragment InputValue on __InputValue {
    name
    description
    type {
      ...TypeRef
    }
    defaultValue
  }
  
  fragment TypeRef on __Type {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
        }
      }
    }
  }  
`;
let [operationResult, isOperationExecuting] = [null, false];

const configLoader = async (configFilePath) => {
  if (operationResult !== null) {
    console.log("Config already loaded. Returning cached result.");
    return operationResult;
  }

  if (isOperationExecuting) {
    return new Promise((resolve) => {
      const checkOperation = () => {
        if (operationResult !== null) {
          resolve(operationResult);
        } else {
          setTimeout(checkOperation, 100);
        }
      };
      checkOperation();
    });
  }

  isOperationExecuting = true;

  try {
    operationResult = await processConfiguration(configFilePath);
    return operationResult;
  } catch (error) {
    throw error;
  } finally {
    isOperationExecuting = false;
  }
};

const loadMetaDataFromFile = async (params, filePath, includeExample) => {
  const rootPath = `${docFolder}/${params}`;
  try {
    require(`${rootPath}/${filePath}`);
    const loadedFileData = require(`${rootPath}/${filePath}`);
    return loadedFileData;
  } catch (fileLoadError) {
    let errorMessage;
    if (
      fileLoadError.code === "ENOENT" ||
      fileLoadError.code === "MODULE_NOT_FOUND"
    ) {
      errorMessage = `Failed to load ::${filePath} \n- ${fileLoadError.message}`;
      if (includeExample) {
        try {
          mkdirSync(rootPath, { recursive: true });
          const fullFilePath = path.join(
            process.cwd(),
            "node_modules/api-nexus/examples",
            // "examples",
            filePath
          );
          const sampleData = require(fullFilePath);
          fsPromises.writeFile(
            `${rootPath}/${filePath}`,
            JSON.stringify(sampleData, null, 4)
          );
          return sampleData;
        } catch (exampleLoadError) {
          console.log("exampleLoadError", exampleLoadError);
          return {};
        }
      }
    } else if (fileLoadError instanceof SyntaxError) {
      errorMessage = `Failed to load ::SyntaxError \n- ${fileLoadError.message}`;
    } else {
      console.log(`File Load Error::${fileLoadError}`);
    }
    console.log(`File Load Error::${errorMessage}`);
    return {};
  }
};

const loadIntrospectionFromUrl = async (graphUrl, folderType, overwrite) => {
  try {
    const introspectionResponse = await fetch(graphUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "",
      },
      body: JSON.stringify({
        operationName: "IntrospectionQuery",
        query: introspectionQuery,
      }),
    });

    if (!introspectionResponse.ok) {
      let errorMessage = "Unknown error";

      if (
        introspectionResponse.headers
          .get("content-type")
          ?.includes("application/json")
      ) {
        const { errors = [] } = await introspectionResponse.json();
        errorMessage = errors?.length
          ? errors.map((error) => error?.message).join(", ")
          : errorMessage;
        console.error("Introspection request failed:", errors);
      } else {
        errorMessage = introspectionResponse?.statusText;
      }

      throw new Error(
        `HTTP Error!\nStatus: ${
          introspectionResponse?.status
        },\nError-Cause in introspection load:: ${JSON.stringify(errorMessage)}`
      );
    }

    const { data: introspectionData = null } =
      await introspectionResponse.json();

    const introspectionFolderPath = path.join(docFolder, folderType);
    const introspectionFilePath = path.join(
      introspectionFolderPath,
      "introspection.json"
    );

    try {
      await fsPromises.access(introspectionFolderPath);
    } catch (accessError) {
      if (accessError.code === "ENOENT") {
        // Directory does not exist, create it
        try {
          await fsPromises.mkdir(introspectionFolderPath, { recursive: true });
        } catch (mkdirError) {
          console.error("Error creating directory:", mkdirError.message);
        }
      } else {
        // Handle other access errors
        console.error(
          "Error checking directory existence:",
          accessError.message
        );
      }
    }

    // try {
    //   await fsPromises.writeFile(
    //     introspectionFilePath,
    //     JSON.stringify(introspectionData ?? {}, null, 4)
    //   );
    // } catch (writeError) {
    //   console.error("Error writing introspection file:", writeError.message);
    // }
    try {
      if (overwrite || !existsSync(introspectionFilePath)) {
        // Overwrite each time or write if the file doesn't exist
        await fsPromises.writeFile(
          introspectionFilePath,
          JSON.stringify(introspectionData ?? {}, null, 4)
        );
      } else {
        try {
          const existingData = require(introspectionFilePath);
          return existingData;
        } catch (readError) {
          console.error("Error reading introspection file:", readError.message);
          return {};
        }
      }
    } catch (writeError) {
      console.error("Error writing introspection file:", writeError.message);
    }

    return introspectionData;
  } catch (loadIntrospectionFromUrlError) {
    throw loadIntrospectionFromUrlError;
  }
};

const replaceEnvironmentVariables = (yamlData) => {
  return yamlData.replace(/\${(.*?)}/g, (match, variableName) => {
    return process.env[variableName] || "Not Specified [Env]";
  });
};

const readConfigFile = async (configFilePath) => {
  try {
    return await fsPromises.readFile(configFilePath, "utf8");
  } catch (configLoadError) {
    if (configLoadError.code === "ENOENT") {
      throw new Error(
        'The "config.yml" file is missing in the project root directory. Please make sure it exists.'
      );
    } else {
      console.error(`Error reading config file: ${configLoadError.message}`);
      throw configLoadError;
    }
  }
};

const processConfiguration = async (configFilePath) => {
  try {
    const yamlData = await readConfigFile(configFilePath);
    const replacedConfig = replaceEnvironmentVariables(yamlData);
    const jsonConfiguration = yaml.load(replacedConfig) || {
      apiNexus: { info: { includeInDocument: "both" } },
    };

    const {
      apiNexus: { graphql = {} },
    } = jsonConfiguration;

    const appContext = {
      introspection: graphql?.introspection?.url
        ? await loadIntrospectionFromUrl(
            graphql?.introspection?.url,
            "graph",
            graphql?.introspection?.overWriteEachTime ?? false
          )
        : await loadMetaDataFromFile(
            "graph",
            `introspection.json`,
            jsonConfiguration?.apiNexus?.includeExample ?? true
          ),
      graphMetaData: await loadMetaDataFromFile(
        "graph",
        `graphMetaData.json`,
        jsonConfiguration?.apiNexus?.includeExample ?? true
      ),
      restMetaData: await loadMetaDataFromFile(
        "rest",
        `restMetaData.json`,
        jsonConfiguration?.apiNexus?.includeExample ?? true
      ),
    };
    return { ...appContext, config: jsonConfiguration };
  } catch (error) {
    console.error("Error in processConfiguration:", error.message);
    throw error;
  }
};

export { configLoader };
