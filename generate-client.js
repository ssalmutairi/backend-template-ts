const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
// accept 2 arguments the name and the path of the file
if (process.argv.length !== 4) {
  console.error("Please provide the name of the client and the path to the OpenAPI schema file");
  console.error("Example: node generate-client.js pet-store openapi/pet-store.openapi.json");
  process.exit(1);
}
let filePath, clientName, className;
clientName = process.argv[2];
clientName = clientName.replace(/[-_](.)/g, (_, $1) => $1.toUpperCase());
filePath = process.argv[3];
fileName = clientName
  .split(/(?=[A-Z])/)
  .join("-")
  .toLowerCase();
className = clientName.charAt(0).toUpperCase();
className += clientName.slice(1).replace(/[-_](.)/g, (_, $1) => $1.toUpperCase());
// console.log({ filePath, clientName, className, fileName });
// generate typescript types from OpenAPI schema
const content = execSync(`npx openapi-typescript ${filePath} -t`, { encoding: "utf-8" });
const fixedContent = content.replace(/requestBody\?/g, "requestBody");

fs.mkdirSync(path.resolve("src", "clients", fileName), { recursive: true });
fs.writeFileSync(path.resolve("src", "clients", fileName, `${fileName}.d.ts`), fixedContent, "utf-8");
console.log("- Typescript types generated successfully!");
const openApiSchema = JSON.parse(fs.readFileSync(path.resolve(filePath), "utf-8"));

// Utility function to generate Axios methods based on OpenAPI paths
function generateAxiosMethod(endpoint, method, responses, requestBody, parameters) {
  // console.log({ endpoint, method, responses, requestBody, parameters });
  const functionName =
    method.charAt(0).toUpperCase() +
    method.slice(1).toLowerCase() +
    endpoint
      .split("/")
      .filter((part) => part !== "")
      .map((part) => part.replace(/{(.*?)}/g, (_, $1) => "By" + $1.charAt(0).toUpperCase() + $1.slice(1)))
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join("")
      .replace(/[^a-zA-Z0-9]/g, "");

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

  if (hasQueryParams) {
    methodParams += `query?: paths["${endpoint}"]["${method}"]["parameters"]["query"], `;
    if (hasRequestBody) {
      axiosCallParams += `, data, { params: query, ...config }`;
    } else {
      axiosCallParams += `, { params: query, ...config }`;
    }
  }

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

  const checkResponseHasContent = (response) => {
    return response["200"] && response["200"]["content"] && response["200"]["content"]["application/json"];
  };
  return `
    // Axios Method for ${endpoint} - ${method.toUpperCase()}
    async ${functionName}(${methodParams}config?: AxiosRequestConfig): Promise<${checkResponseHasContent(responses) ? `paths["${endpoint}"]["${method}"]["responses"]["200"]["content"]["application/json"]` : "unknown"}> {
        const response = await this.axiosInstance.${method}(${axiosCallParams}${requestBodyParam}${hasQueryParams ? "" : ", config"});
        return response.data;
    }
  `;
}

// Generate Axios Client
function generateAxiosClient() {
  const clientClass = `
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { paths } from "./${fileName}";

class ${className}Client {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string = "https://api.yourdomain.com") {
        this.axiosInstance = axios.create({
            baseURL,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
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
        const { responses, requestBody, parameters } = operation;
        clientMethods += generateAxiosMethod(endpoint, method, responses, requestBody, parameters);
      }
    }
  }

  const clientEnd = `
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
    fastify.decorate("${clientName}Client", new ${className}(process.env.${envName}));
  },
  {
    name: "${clientName}Client",
  },
);
`;
fs.writeFileSync(path.resolve("src", "clients", fileName, `${fileName}.client.ts`), fastifyPlugin, "utf-8");
console.log("- Fastify client plugin generated successfully!");