import fastifyJwt, { FastifyJWTOptions } from "@fastify/jwt";
import fp from "fastify-plugin";
import "@fastify/jwt";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      id: number;
      name: string;
      username: string;
    }; // user type is return type of `request.user` object
  }
}

export default fp<FastifyJWTOptions>(
  async (fastify) => {
    fastify.register(fastifyJwt, { secret: process.env.JWT_SECRET || "jwt-secret" });

    fastify.decorate("authenticate", async function (request) {
      try {
        await request.jwtVerify();
      } catch (err) {
        request.log.error(err);
        throw fastify.httpErrors.unauthorized("auth.error.unauthorized");
      }
    });
  },
  { name: "jwt" },
);
