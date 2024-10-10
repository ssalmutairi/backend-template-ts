import websocket, { WebsocketPluginOptions } from "@fastify/websocket";
import fp from "fastify-plugin";

export default fp<WebsocketPluginOptions>(
  async (fastify) => {
    fastify.register(websocket, {
      errorHandler: function (error, socket) {
        fastify.log.error(error);
        socket.terminate();
      },
      options: {
        maxPayload: 1048576, // we set the maximum allowed messages size to 1 MiB
      },
    });
  },
  { name: "websocket" },
);
