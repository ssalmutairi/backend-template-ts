import fp from "fastify-plugin";
import compress, { FastifyCompressOptions } from "@fastify/compress";

export default fp<FastifyCompressOptions>(
  async (fastify) => {
    fastify.register(compress, {});
  },
  { name: "compress" },
);
