import fp from "fastify-plugin";
import { WebSocket } from "@fastify/websocket";
import { sleep } from "../helpers/common.js";

interface WebSocketCustom extends WebSocket {
  isActive: boolean;
  userId: string;
}

export default fp(async (fastify): Promise<void> => {
  const { redis, redisChannel, websocketServer } = fastify;

  const clients = new Set() as Set<WebSocketCustom>;

  websocketServer.on("connection", (socket) => {
    const customSocket = socket as WebSocketCustom;
    customSocket.isActive = true;
    clients.add(customSocket);
    customSocket.on("close", () => clients.delete(customSocket));
  });

  async function livenessCheck() {
    while (true) {
      await sleep(15 * 1000); // 15 seconds
      for (const client of clients) {
        if (client.isActive) {
          client.isActive = false;
          client.ping(() => {});
        } else {
          client.terminate();
          clients.delete(client);
        }
      }
    }
  }
  livenessCheck();

  fastify.get("/websocket", { websocket: true }, (socket) => {
    const customSocket = socket as WebSocketCustom;
    customSocket.isActive = true;
    customSocket.on("pong", () => (customSocket.isActive = true));

    customSocket.on("message", async (message) => {
      try {
        const { userId } = JSON.parse(message.toString());
        customSocket.userId = userId;
      } catch (error) {
        fastify.log.error(error);
      }
    });
    // subscribe to a channel on redis
    const subscriber = redis.duplicate();
    subscriber.subscribe(redisChannel);

    subscriber.on("message", (channel, message) => {
      fastify.log.warn({ channel, message });
      try {
        const { userId, payload } = JSON.parse(message);
        if (userId === customSocket.userId) {
          customSocket.send(JSON.stringify(payload));
        }
      } catch (error) {
        fastify.log.error(error);
      }
    });
    customSocket.on("close", () => {
      subscriber.unsubscribe(redisChannel);
      subscriber.quit();
    });
  });
});