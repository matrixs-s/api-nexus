import { faker } from "@faker-js/faker";

const addDummy = (randomDataType) => {
  // Generate random data based on data type
  let data = null;
  // eslint-disable-next-line default-case
  switch (randomDataType) {
    case "String":
      data = faker.lorem.words(1);
      break;
    case "Number":
      data = faker.number.int();
      break;
    case "Boolean":
      data = faker.datatype.boolean();
      break;
    case "Date":
      data = faker.date.past();
      break;
    case "Array":
      data = [faker.number.int(), faker.lorem.words(1)];
      break;
    case "Object":
      data = {
        subKey1: faker.number.int(),
        subKey2: faker.lorem.word(),
      };
      break;
  }
  return data;
};

const parseNestedData = (obj) => {
  const transformed = {};
  if (typeof obj !== "object") return obj;
  for (const key in obj) {
    const value = obj[key];
    transformed[key] =
      value.type === "Object" && !value.value
        ? parseNestedData(value)
        : value?.value !== undefined
        ? value.value
        : value?.type
        ? addDummy(value.type)
        : value?.type;
  }
  return transformed;
};

export default parseNestedData;
