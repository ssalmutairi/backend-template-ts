import { errorSchema, messageResponseSchema } from "../shared/common.schema";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { loginBodySchema, loginResponseSchema, loginSchemaType, logoutSchemaType } from "./auth.schema";
const auth: FastifyPluginAsyncTypebox = async (fastify): Promise<void> => {
  // api to login
  fastify.route<loginSchemaType>({
    method: "POST",
    url: "/login",
    schema: {
      tags: ["auth"],
      deprecated: false,
      hide: false,
      summary: "login request",
      description: "login request",
      body: loginBodySchema,
      response: {
        200: loginResponseSchema,
        400: errorSchema,
        401: errorSchema,
        404: errorSchema,
        500: errorSchema,
      },
    },
    handler: async (request, reply) => {
      const data = request.body;
      const result = await fastify.authService.login({ data, request });
      reply.setCookie("access_token", result.token, { path: "/", httpOnly: true, secure: true });

      // get ip from request.headers["x-forwarded-for"] || request.ip and convert it to string
      const ips = request.headers["x-forwarded-for"] || request.ip;
      const ip = Array.isArray(ips) ? ips.join(", ") : ips;

      await fastify.sessionService.createSession({
        data: { userId: result.id, token: result.token, ip, active: true },
      });
      return result;
    },
  });

  // api to logout
  fastify.route<logoutSchemaType>({
    method: "POST",
    url: "/logout",
    schema: {
      tags: ["auth"],
      deprecated: false,
      hide: false,
      summary: "logout request",
      description: "logout request",
      response: {
        200: messageResponseSchema,
        400: errorSchema,
        404: errorSchema,
        500: errorSchema,
      },
      security: [{ bearerAuth: [] }],
    },
    handler: async (request, reply) => {
      const userId = request.user.id;
      const token = request.headers["authorization"]?.split(" ")[1] || "";
      const result = await fastify.authService.logout({ userId });
      reply.setCookie("access_token", "", { expires: new Date(0) }).clearCookie("access_token");
      await fastify.sessionService.updateSession({ data: { userId, token } });
      return result;
    },
  });
};

export default auth;
