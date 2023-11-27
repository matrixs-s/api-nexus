import { introspectionTypeToString } from "./typeParser";

export default GenerateQuery = (queryParams, queryType) => {
  const [prefix, queryName] = [`${queryType}`, queryParams?.name];

  if (!queryParams?.args?.length) {
    return `${prefix} {${queryName}}`;
  }
  const argStr = queryParams?.args
    .filter((item, pos) => queryParams?.args.indexOf(item) === pos)
    .map((arg) => `$${arg.name}: ${introspectionTypeToString(arg.type)}`);

  const query = `${prefix} ${queryName}(${
    argStr ? `${argStr}` : ""
  }){\n%params%\n}`;

  const finalQuery = query.replace(
    "%params%",
    `${queryName}(${queryParams.args
      .filter((item, pos) => queryParams.args.indexOf(item) === pos)
      .map((arg) => `${arg.name}: $${arg.name}`)})`
  );
  return finalQuery;
};
