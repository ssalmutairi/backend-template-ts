import fs from "fs";
import path from "path";
import * as changeCase from "change-case";
import { execSync } from "child_process";
// accept 2 arguments the name and the path of the file
if (process.argv.length !== 4) {
  console.error("Please provide the name of the client and the path to the OpenAPI schema file");
  console.error("Example: node generate-client.js pet-store openapi/pet-store.openapi.json");
  process.exit(1);
}
let filePath, clientName, className, fileName;
clientName = process.argv[2];
clientName = changeCase.camelCase(clientName.replace(/[-_](.)/g, (_, $1) => $1.toUpperCase()));
filePath = process.argv[3];
fileName = changeCase.kebabCase(clientName);
className = changeCase.pascalCase(clientName);
// generate typescript types from OpenAPI schema
const content = execSync(`npx openapi-typescript ${filePath} -t`, { encoding: "utf-8" });
const fixedContent = content.replace(/requestBody\?/g, "requestBody");

fs.mkdirSync(path.resolve("src", "clients", fileName), { recursive: true });
fs.writeFileSync(path.resolve("src", "clients", fileName, `${fileName}.d.ts`), fixedContent, "utf-8");
console.log("- Typescript types generated successfully!");
let openApiSchema;
if (filePath.includes("http")) {
  const content = execSync(`curl -s ${filePath}`, { encoding: "utf-8" });
  openApiSchema = JSON.parse(content);
} else {
  openApiSchema = JSON.parse(fs.readFileSync(path.resolve(filePath), "utf-8"));
}
const apiVersion = openApiSchema.info.version || "unknown";
// Utility function to generate Axios methods based on OpenAPI paths
function generateAxiosMethod(endpoint, method, responses, requestBody, parameters) {
  // replace endpoint has params end with {param} or :param for path  ByParamName
  const endpointWithParams = endpoint.replace(/{(.*?)}/g, "By/$1").replace(/:(.*?)(\/|$)/g, "By/$1");
  const functionName =
    changeCase.camelCase(method) +
    changeCase.pascalCase(
      endpointWithParams
        .split("/")
        .map((part) => changeCase.pascalCase(part))
        .join(""),
    );
  const hasRequestBody = !!requestBody;
  const hasQueryParams = parameters?.filter((param) => param.in === "query").length > 0;
  const hasPathParams = parameters?.filter((param) => param.in === "path").length > 0;

  let methodParams = "";
  let axiosCallParams = "";
  let requestBodyParam = "";

  if (hasPathParams) {
    const pathParams = parameters
      .filter((param) => param.in === "path")
      .map((param) => `${param.name}: ${param.schema.type === "string" ? "string" : "number"}`)
      .join(", ");
    methodParams += `${pathParams}, `;
    axiosCallParams = `\`${endpoint.replace(/{(.*?)}/g, "${$1}")}\``;
  } else {
    axiosCallParams = `"${endpoint}"`;
  }

  const isRequestBodyOctetStream = (requestBody) => {
    return !!requestBody?.content?.["application/octet-stream"];
  };

  if (hasRequestBody) {
    if (isRequestBodyOctetStream(requestBody)) {
      methodParams += `data: paths["${endpoint}"]["${method}"]["requestBody"]["content"]["application/octet-stream"], `;
    } else {
      methodParams += `data: paths["${endpoint}"]["${method}"]["requestBody"]["content"]["application/json"], `;
    }
    if (!hasQueryParams) {
      requestBodyParam = ", data";
    } else {
      requestBodyParam = "";
    }
  }

  if (hasQueryParams) {
    methodParams += `query?: paths["${endpoint}"]["${method}"]["parameters"]["query"], `;
    if (hasRequestBody) {
      axiosCallParams += ", data, { params: query, ...config }";
    } else {
      axiosCallParams += ", { params: query, ...config }";
    }
  }

  const checkResponseHasContent = (response) => {
    return response["200"] && response["200"]["content"] && response["200"]["content"]["application/json"];
  };
  return `
    // Axios Method for ${endpoint} - ${method.toUpperCase()} 
    async ${functionName}(${methodParams}config?: AxiosRequestConfig): Promise<AxiosResponse<${checkResponseHasContent(responses) ? `paths["${endpoint}"]["${method}"]["responses"]["200"]["content"]["application/json"]` : "unknown"}>> {
        const response = await this.axiosInstance.${method}(${axiosCallParams}${requestBodyParam}${hasQueryParams ? "" : ", config"});
        return response;
    }
  `;
}

// Generate Axios Client
function generateAxiosClient() {
  const clientClass = `
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { paths } from "./${fileName}";
import https from "https";


class ${className}Client {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string = "https://api.yourdomain.com") {
        this.axiosInstance = axios.create({
            baseURL,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            httpsAgent: baseURL.startsWith("https") ? new https.Agent({ rejectUnauthorized: false }) : undefined,
        });
    }
  `;

  const endpoints = openApiSchema.paths; // Use paths from OpenAPI schema

  let clientMethods = "";
  for (const endpoint in endpoints) {
    const methods = endpoints[endpoint];
    for (const method in methods) {
      if (method !== "parameters") {
        const operation = methods[method];
        const { responses, requestBody, parameters, deprecated } = operation;
        if (deprecated) {
          continue;
        }
        clientMethods += generateAxiosMethod(endpoint, method, responses, requestBody, parameters);
      }
    }
  }

  const clientEnd = `
    version: string = "${apiVersion}";        
}

export default ${className}Client;
  `;

  const clientCode = clientClass + clientMethods + clientEnd;
  return clientCode;
}

// Write the generated client to a file
const clientCode = generateAxiosClient();

const envName =
  clientName
    .split(/(?=[A-Z])/)
    .join("_")
    .toUpperCase()
    .replace(/[-_]/g, "_") + "_BASE_URL";

fs.writeFileSync(path.resolve("src", "clients", fileName, `${fileName}.axios.ts`), clientCode, "utf-8");
console.log("- Axios client generated successfully!");

// check if .env file exists  append the env var
const envPath = path.resolve(".env");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  if (!envContent.includes(envName)) {
    fs.appendFileSync(envPath, `${envName}\t\t= 'http://localhost:4000'\n`, "utf-8");
    console.log("- Environment variable added to .env file!");
  } else {
    console.log("- Environment variable already exists in .env file!");
  }
} else {
  // cp .env.example .env then append the env var if .enx.example exists
  const envExamplePath = path.resolve(".env.example");
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    fs.appendFileSync(envPath, `${envName}\t\t= 'http://localhost:4000'\n`, "utf-8");
    console.log("- Environment variable added to .env file!");
  } else {
    console.log("- Environment variable not added to .env file, please add it manually!");
  }
}

// generate fastify client plugin
const fastifyPlugin = `import fp from "fastify-plugin";
import ${className} from "./${fileName}.axios";


declare module "fastify" {
  interface FastifyInstance {
    // Add your plugin methods here
    ${clientName}Client: ${className};
  }
}

export default fp(
  async (fastify) => {
    const ${clientName}Client = new ${className}(process.env.${envName});
    fastify.decorate("${clientName}Client", ${clientName}Client);
    fastify.log.info(\`${className} client registered - version: \${${clientName}Client.version}\`);
  },
  {
    name: "${clientName}Client",
  },
);
`;
fs.writeFileSync(path.resolve("src", "clients", fileName, `${fileName}.client.ts`), fastifyPlugin, "utf-8");
console.log("- Fastify client plugin generated successfully!");
