import fp from "fastify-plugin";
import Template from "./template.axios";


declare module "fastify" {
  interface FastifyInstance {
    // Add your plugin methods here
    templateClient: Template;
  }
}

export default fp(
  async (fastify) => {
    fastify.decorate("templateClient", new Template(process.env.TEMPLATE_BASE_URL));
  },
  {
    name: "templateClient",
  },
);
