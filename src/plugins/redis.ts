import fp from "fastify-plugin";
import fastifyRedis, { FastifyRedisPluginOptions } from "@fastify/redis";

declare module "fastify" {
  interface FastifyInstance {
    redisChannel: string;
    redisPublisher: (message: string) => void;
  }
}

export default fp<FastifyRedisPluginOptions>(
  async (fastify) => {
    if (process.env.REDIS_ENABLED !== "true") {
      fastify.log.warn("Redis is not enabled");
      return;
    }
    // wait for redis to be ready
    await fastify.register(fastifyRedis, {
      host: process.env.REDIS_HOST || "127.0.0.1",
      username: process.env.REDIS_USERNAME || "",
      password: process.env.REDIS_PASSWORD || "",
      port: parseInt(process.env.REDIS_PORT || "") || 6379,
      family: 4,
    });

    const channel = process.env.REDIS_CHANNEL || "notification_channel";
    fastify.decorate("redisChannel", channel);
    const publisher = fastify.redis.duplicate();
    const redisPublisher = (message: string) => {
      publisher.publish(channel, message);
    };
    fastify.decorate("redisPublisher", redisPublisher);
    fastify.log.info("Redis enabled");
  },
  { name: "redis" },
);
