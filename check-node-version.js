import semver from "semver";

const expectedNodeVersion = "16.0.0"; // Replace with your required version

if (!semver.satisfies(process.version, expectedNodeVersion)) {
  console.error(
    `Error: This package requires Node.js version ${expectedNodeVersion} or higher, but you are using version ${process.version}.`
  );
  process.exit(1); // Exit with an error code
};