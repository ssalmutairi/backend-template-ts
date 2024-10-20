import fp from "fastify-plugin";
import PetStore from "./pet-store.axios";

declare module "fastify" {
  interface FastifyInstance {
    // Add your plugin methods here
    petStoreClient: PetStore;
  }
}

export default fp(
  async (fastify) => {
    const petStoreClient = new PetStore(process.env.PET_STORE_BASE_URL);
    fastify.decorate("petStoreClient", petStoreClient);
    fastify.log.info(`PetStore client registered - version: ${petStoreClient.version}`);
  },
  {
    name: "petStoreClient",
  },
);
