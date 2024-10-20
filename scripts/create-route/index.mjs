import fs from "fs/promises";
import path from "path";
import pluralize from "pluralize";
import chalk from "chalk";
import { URL } from "url";
const execute = async () => {
  // Get the name of the route
  const routeName = process.argv[2];
  const workspaceFolder = process.argv[3];

  console.log("Creating route: ", routeName);
  console.log("Workspace folder: ", workspaceFolder);

  const fileName = pluralize.singular(
    routeName
      .split(/(?=[A-Z])/)
      .join("-")
      .split(" ")
      .map((word) => word.toLowerCase())
      .join("-"),
  );
  const variableName = pluralize.singular(
    routeName
      .split(/(?=[A-Z])/)
      .join(" ")
      .split(" ")
      .map((word, index) => {
        if (index === 0) {
          return word.toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(""),
  );
  const className = pluralize.singular(
    routeName
      .split(/(?=[A-Z])/)
      .join(" ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(""),
  );
  const routeNamePlural = pluralize(fileName);

  console.log("Route Name: ", chalk.green(routeName));
  console.log("File Name: ", chalk.green(fileName));
  console.log("Variable Name: ", variableName);
  console.log("Class Name: ", className);
  console.log("Route Name Plural: ", routeNamePlural);

  // generate route folder in workspace src/routes
  const routeFolder = path.join(workspaceFolder, "src", "routes", routeNamePlural);
  await fs.mkdir(routeFolder, { recursive: true });

  // fix __dirname in esm
  const __dirname = path.dirname(new URL(import.meta.url).pathname);

  // read template model and replace Template with className and template with variableName and write to file
  const modelTemplate = await fs.readFile(path.join(__dirname, "template.model.txt"), "utf-8");
  const modelContent = modelTemplate.replace(/Template/g, className).replace(/template/g, variableName);
  await fs.writeFile(path.join(routeFolder, `${fileName}.model.ts`), modelContent, "utf-8");

  // read template schema and replace Template with className and template with variableName and write to file
  const schemaTemplate = await fs.readFile(path.join(__dirname, "template.schema.txt"), "utf-8");
  const schemaContent = schemaTemplate
    .replace(/Template/g, className)
    .replace(/template/g, variableName)
    .replace(`${variableName}.model`, `${fileName}.model`);
  await fs.writeFile(path.join(routeFolder, `${fileName}.schema.ts`), schemaContent, "utf-8");

  // read template routes and replace Template with className and template with variableName and write to file and ignore template.model
  const routesTemplate = await fs.readFile(path.join(__dirname, "template.routes.txt"), "utf-8");
  const routesContent = routesTemplate
    .replace(/Template/g, className)
    .replace(/template/g, variableName)
    .replace(`${variableName}.schema`, `${fileName}.schema`);
  await fs.writeFile(path.join(routeFolder, `${fileName}.routes.ts`), routesContent, "utf-8");

  // read template service and replace Template with className and template with variableName and write to file
  const serviceTemplate = await fs.readFile(path.join(__dirname, "template.service.txt"), "utf-8");
  const serviceContent = serviceTemplate
    .replace(/Template/g, className)
    .replace(/template/g, variableName)
    .replace(`${variableName}.schema`, `${fileName}.schema`);
  await fs.writeFile(path.join(routeFolder, `${fileName}.service.ts`), serviceContent, "utf-8");

  // import header and register fastify routes in src/app.ts

  const appFile = path.join(workspaceFolder, "src", "app.ts");
  let appContent = await fs.readFile(appFile, "utf-8");

  const importStatement = `import ${variableName}Service from "./routes/${routeNamePlural}/${fileName}.service";`;
  const importRoutesStatement = `import ${variableName}Routes from "./routes/${routeNamePlural}/${fileName}.routes";`;
  const registerStatement = ` fastify.register(${variableName}Service);`;
  const registerRoutesStatement = `  fastify.register(f => f.register(${variableName}Routes), { prefix: "/api/${routeNamePlural}" });`;
  let matchString, lastServiceIndex, updatedAppContent;

  if (!appContent.includes(importStatement)) {
    // append import statement
    matchString = '.service";';
    lastServiceIndex = appContent.lastIndexOf(matchString) + matchString.length;
    updatedAppContent = appContent.slice(0, lastServiceIndex);
    updatedAppContent += `\n${importStatement}`;
    updatedAppContent += appContent.slice(lastServiceIndex);
    appContent = updatedAppContent;
  }

  if (!appContent.includes(importRoutesStatement)) {
    // append import routes statement end of `Service);`
    matchString = '.routes";';
    lastServiceIndex = appContent.lastIndexOf(matchString) + matchString.length;
    updatedAppContent = appContent.slice(0, lastServiceIndex);
    updatedAppContent += `\n${importRoutesStatement}`;
    updatedAppContent += appContent.slice(lastServiceIndex);
    appContent = updatedAppContent;
  }

  if (!appContent.includes(registerStatement)) {
    // append register service statement end of `Service);`
    matchString = "Service);";
    lastServiceIndex = appContent.lastIndexOf(matchString) + matchString.length;
    updatedAppContent = appContent.slice(0, lastServiceIndex);
    updatedAppContent += `\n ${registerStatement}`;
    updatedAppContent += appContent.slice(lastServiceIndex);
    appContent = updatedAppContent;
  }

  if (!appContent.includes(registerRoutesStatement)) {
    // append register routes statement end of `fastify.register(f => f.register`
    matchString = "fastify.register((f) => f.register";
    const findLine = appContent.lastIndexOf(matchString);
    const findLineEnd = appContent.indexOf(";", findLine) + 1;
    updatedAppContent = appContent.slice(0, findLineEnd);
    updatedAppContent += `\n${registerRoutesStatement}`;
    updatedAppContent += appContent.slice(findLineEnd);
    appContent = updatedAppContent;
  }

  await fs.writeFile(appFile, appContent, "utf-8");
  console.log("Route created successfully");
};

execute();
