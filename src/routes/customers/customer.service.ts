import fp from "fastify-plugin";




interface CustomerService {
  customerFunction: (name: string) => string;
}

const servicePlugin = fp(async (fastify) => {
  const {} = fastify;

  const customerService: CustomerService = {

    customerFunction: (name) => {
      return `Hello ${name}`;
    },
  };
  fastify.decorate("customerService", customerService);
});

export default servicePlugin;

declare module "fastify" {
  interface FastifyInstance {
    customerService: CustomerService;
  }
}
