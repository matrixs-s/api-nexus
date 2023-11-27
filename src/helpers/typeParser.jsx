import { KINDS } from "microfiber";

// Analyze a Type that's part of an Introspection object
export const analyzeTypeIntrospection = (type) => {
  let isRequired = false;
  let itemsRequired = false;
  let isArray = false;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (type?.kind === KINDS?.NON_NULL) {
      if (isArray) {
        itemsRequired = true;
      } else {
        isRequired = true;
      }
    } else if (type?.kind === KINDS?.LIST) {
      isArray = true;
    } else {
      break;
    }
    type = type?.ofType;
  }

  return {
    underlyingType: type,
    isRequired,
    isArray,
    itemsRequired,
  };
};

export const introspectionTypeToString = (type, { joiner = "" } = {}) => {
  const { underlyingType, isRequired, isArray, itemsRequired } =
    analyzeTypeIntrospection(type);

  const pieces = [underlyingType?.name];
  if (isArray) {
    if (itemsRequired) {
      pieces.push("!");
    }
    pieces.unshift("[");
    pieces.push("]");
  }
  if (isRequired) {
    pieces.push("!");
  }

  return pieces.join(joiner);
};
