import { faker } from "@faker-js/faker";

const addRandomValue = (randomDataType) => {
  switch (type) {
    case "name":
      return faker.person.firstName();
    case "city":
      return faker.location.city();
    case "state":
      return faker.location.state();
    case "country":
      return faker.location.country();
    case "zip-code":
      return faker.location.zipCode();
    case "latitude":
      return faker.location.latitude();
    case "longitude":
      return faker.location.longitude();
    case "string":
      return faker.lorem.words(1);
    case "number":
      return faker.number.int(10000);
    case "boolean":
      return faker.datatype.boolean();
    case "date":
      return faker.date.past();
    case "time":
      return faker.date.past().toTimeString().slice(0, 8);
    case "email":
      return faker.internet.email();
    case "password":
      return faker.internet.password();
    case "file-name":
      return faker.system.fileName();
    case "file-path":
      return faker.system.filePath();
    case "cron":
      return faker.system.cron();
    case "url":
      return faker.internet.url();
    case "uuid":
      return faker.string.uuid();
    case "phone":
      return faker.phone.number();
    case "text":
      return faker.lorem.paragraph(3);
    case "currency":
      return faker.finance.currencyName();
    case "amount":
      return faker.finance.amount();
    case "color":
      return faker.internet.color();
    case "image-url":
      return faker.image.url();
    case "price":
      return faker.commerce.price();
    case "float":
      return faker.number.float();
    case "array":
      return [faker.lorem.words(1), faker.lorem.words(1)];
    case "object":
      return {
        subKey1: faker.number.int(),
        subKey2: faker.lorem.word(),
      };
    default:
      return null;
  }
};

const parseNestedData = (schema) => {
  const {
    properties: schemaProperties,
    items: schemaItems,
    type: schemaType,
    value: schemaValue,
  } = schema;

  const generateArrayValues = (items) =>
    Array.from({ length: items?.length }, (_, index) =>
      generatePropertyValue(items?.[index])
    );

  const generatePropertyValue = (propertySchema) => {
    const { type, properties, items, value } = propertySchema;

    if (type === "object") {
      const obj = {};
      for (const prop in properties) {
        obj[prop] = generatePropertyValue(properties[prop]);
      }
      return value ?? obj;
    } else if (type === "array") {
      return value ?? generateArrayValues(items);
    } else {
      return value ?? addRandomValue(type ?? "string");
    }
  };

  return schemaValue
    ? schemaValue
    : schemaType === "array"
      ? schemaItems?.length
        ? generateArrayValues(schemaItems)
        : []
      : (() => {
          const resultObject = {};
          for (const prop in schemaProperties) {
            resultObject[prop] = generatePropertyValue(schemaProperties[prop]);
          }
          return resultObject;
        })();
};

export default parseNestedData;