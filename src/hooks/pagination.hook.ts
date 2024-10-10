import "fastify";
import { FastifyRequest } from "fastify";
import fp from "fastify-plugin";

interface PaginationQuery {
  page?: number;
  pageSize?: number;
}
declare module "fastify" {
  interface FastifyRequest {
    pagination: {
      skip: number;
      take: number;
    };
  }
}
export default fp(async (fastify) => {
  fastify.addHook("preHandler", async (request: FastifyRequest) => {
    // TODO: Implement pagination from query parameters (page and pageSize)
    const { page = 1, pageSize = 10 } = request.query as PaginationQuery;
    const skip = (page - 1) * pageSize;
    request.pagination = {
      skip: skip < 0 ? 1 : skip,
      take: parseInt(pageSize.toString(), 10),
    };
  });
});
