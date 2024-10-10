import fastifyCookie from "@fastify/cookie";
import fp from "fastify-plugin";

export default fp(
  async (fastify) => {
    fastify.register(fastifyCookie, {
      secret: process.env.COOKIE_SECRET || "key-secret",
    });
  },
  { name: "cookie" },
);
