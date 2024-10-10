import fp from "fastify-plugin";
import "fastify";

declare module "fastify" {
  interface FastifyRequest {
    token: string;
  }
  interface FastifyInstance {
    authenticate: (request: FastifyRequest) => Promise<void>;
  }
}

export default fp(async (fastify) => {
  fastify.addHook("preHandler", async (request) => {
    // remove last slash from url if present
    let url = request.routeOptions.url || "";
    url = url.endsWith("/") ? url.slice(0, -1) : url;

    const publicRoutes = ["/api/auth/login", "/websocket", '/api/template'];

    // Skip authentication for public routes
    if (publicRoutes.includes(url) || url.includes("documentation")) {
      return;
    }

    // check if request is not present in headers take it from cookies
    if (!request.headers.authorization && request.cookies["access_token"]) {
      request.headers.authorization = `Bearer ${request.cookies["access_token"]}`;
    }

    // if no authorization header is present throw unauthorized error
    if (!request.headers.authorization) {
      throw fastify.httpErrors.unauthorized("auth.errors.unauthorized");
    }

    // authenticate all requests starting with /api
    if (url.startsWith("/api")) {
      await fastify.authenticate(request);
    }
  });
});
