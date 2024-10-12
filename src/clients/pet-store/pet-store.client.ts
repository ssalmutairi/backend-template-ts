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
    fastify.decorate("petStoreClient", new PetStore(process.env.PET_STORE_BASE_URL));
  },
  {
    name: "petStoreClient",
  },
);
