import fp from "fastify-plugin";
import multipart, { FastifyMultipartOptions } from "@fastify/multipart";

export default fp<FastifyMultipartOptions>(
  async (fastify) => {
    fastify.register(multipart, {
      limits: {
        fileSize: 1024 * 1024 * parseInt(process.env.MAX_FILE_SIZE || "10", 10), // default 10MB
        files: parseInt(process.env.MAX_NUMBER_OF_FILES || "1", 10), // default 1 file
      },
    });
  },
  { name: "multipart" },
);
