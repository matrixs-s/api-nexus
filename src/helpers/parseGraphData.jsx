import { faker } from "@faker-js/faker";
import { introspectionTypeToString } from "../../src/helpers/typeParser";

const dataTypeMap = {
  String: () => faker.lorem.words(1),
  Int: () => faker.number.int(200),
  Boolean: () => faker.datatype.boolean(),
  Float: () => faker.number.float(),
  JSON: () => ({}),
  Date: () => faker.date.past(),
  UUID: () => faker.string.uuid(),
  Time: () => faker.date.recent().toLocaleTimeString(),
  Array: () => [faker.number.int(), faker.lorem.words(1)],
  Object: () => ({
    subKey1: faker.number.int(),
    subKey2: faker.lorem.word(),
  }),
};

const addDummy = (randomDataType) =>
  dataTypeMap[randomDataType]?.() ?? randomDataType;

const parseGraphData = (params, kind, name) => {
  if (kind === "SCALAR" && !params.length) {
    return addDummy(name);
  }

  if ((kind === "INPUT_OBJECT" || kind === "OBJECT") && params?.length) {
    const transformed = {};
    for (const key in params) {
      const type = introspectionTypeToString(params?.[key]?.type);
      const value = type.replace(/!$/, "");
      transformed[params[key].name] = addDummy(value);
    }
    return transformed;
  }

  if (kind === "ENUM" && params?.length) {
    const randomParamName =
      params?.[Math.floor(Math.random() * params?.length)]?.name?.toString() ??
      "";
    return randomParamName;
  }

  return addDummy("String");
};

export default parseGraphData;
