import AutoLoad, { AutoloadPluginOptions } from "@fastify/autoload";
import { FastifyPluginAsync, FastifyServerOptions } from "fastify";
import { join } from "path";
import webSocketPlugin from "./websocket/websocket.routes";

export interface AppOptions extends FastifyServerOptions, Partial<AutoloadPluginOptions> {}
// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {
  pluginTimeout: 30000,
};

const app: FastifyPluginAsync<AppOptions> = async (fastify, options): Promise<void> => {
  //! sequence of loading plugins is important
  // Place here your custom code!
  // Do not touch the following line

  // This loads all plugins defined in `plugins`
  fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: { ...options },
    encapsulate: false,
  });

  // This loads all plugins defined in `hooks`
  fastify.register(AutoLoad, {
    dir: join(__dirname, "hooks"),
    options: { ...options },
    encapsulate: false,
  });

  // This loads all plugins defined in `routes`
  fastify.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    options: { ...options },
    ignoreFilter: (path) => !/.*\.(service.js)/.test(path),
    encapsulate: false,
  });

  // This loads all plugins defined in `routes`
  fastify.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    ignoreFilter: (path) => !/.*\.(routes.js)/.test(path),
    options: { ...options, prefix: "/api" },
  });

  // load websocket plugin
  fastify.register(webSocketPlugin)
};

export default app;
export { app, options };
