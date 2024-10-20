import AutoLoad, { AutoloadPluginOptions } from "@fastify/autoload";
import { FastifyPluginAsync, FastifyServerOptions } from "fastify";
import { mkdir } from "fs/promises";
import { join } from "path";

// plugins
import sensiblePlugin from "./plugins/sensible.plugin";
import redisPlugin from "./plugins/redis.plugin";
import compressPlugin from "./plugins/compress.plugin";
import cookiePlugin from "./plugins/cookie.plugin";
import corsPlugin from "./plugins/cors.plugin";
import formbodyPlugin from "./plugins/formbody.plugin";
import helmetPlugin from "./plugins/helmet.plugin";
import i18nextPlugin from "./plugins/i18next.plugin";
import jwtPlugin from "./plugins/jwt.plugin";
import multipartPlugin from "./plugins/multipart.plugin";
import prismaPlugin from "./plugins/prisma.plugin";
import qsPlugin from "./plugins/qs.plugin";
import rateLimitPlugin from "./plugins/rate-limit.plugin";
import swaggerPlugin from "./plugins/swagger.plugin";
import websocketPlugin from "./plugins/websocket.plugin";

// hooks
import authenticateHook from "./hooks/authenticate.hook";
import languageHook from "./hooks/language.hook";
import errorHook from "./hooks/error.hook";
import paginationHook from "./hooks/pagination.hook";

// services
import sessionService from "./routes/sessions/session.service";
import authService from "./routes/auth/auth.service";
import userService from "./routes/users/user.service";

// routes
import websocketRoutes from "./websocket/websocket.routes";
import authRoutes from "./routes/auth/auth.routes";
import userRoutes from "./routes/users/user.routes";

export interface AppOptions extends FastifyServerOptions, Partial<AutoloadPluginOptions> {}
// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {
  pluginTimeout: 30000,
};

const app: FastifyPluginAsync<AppOptions> = async (fastify, options): Promise<void> => {
  //! sequence of loading plugins is important
  // Place here your custom code!
  // Do not touch the following line

  // loading all plugins manually to control the sequence
  fastify.register(sensiblePlugin);
  fastify.register(redisPlugin);
  fastify.register(compressPlugin);
  fastify.register(cookiePlugin);
  fastify.register(corsPlugin);
  fastify.register(formbodyPlugin);
  fastify.register(helmetPlugin);
  fastify.register(i18nextPlugin);
  fastify.register(jwtPlugin);
  fastify.register(multipartPlugin);
  fastify.register(prismaPlugin);
  fastify.register(qsPlugin);
  fastify.register(rateLimitPlugin);
  fastify.register(swaggerPlugin);
  fastify.register(websocketPlugin);

  // load hooks manually
  fastify.register(authenticateHook);
  fastify.register(languageHook);
  fastify.register(errorHook);
  fastify.register(paginationHook);

  // load all clients automatically
  await mkdir(join(__dirname, "clients"), { recursive: true });
  fastify.register(AutoLoad, {
    dir: join(__dirname, "clients"),
    options: { ...options },
    ignoreFilter: (path) => !/.*\.(client.js)/.test(path),
    encapsulate: false,
  });

  // load all services manually
  fastify.register(sessionService);
  fastify.register(userService);
  fastify.register(authService);

  // load all routes manually
  fastify.register((f) => f.register(websocketRoutes));
  fastify.register((f) => f.register(authRoutes), { prefix: "/api/auth" });
  fastify.register((f) => f.register(userRoutes), { prefix: "/api/users" });
};

export default app;
export { app, options };
