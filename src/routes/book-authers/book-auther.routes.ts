import fp from "fastify-plugin";

import { setPaginationHeaders } from "../../helpers/common";
import { errorSchema, messageResponseSchema } from "../shared/common.schema";
import {
  bookAutherCreateBodySchema,
  bookAutherCreateSchemaType,
  bookAutherDeleteSchemaType,
  bookAutherGetListSchemaType,
  bookAutherGetOneSchemaType,
  bookAutherListResponseSchema,
  bookAutherParamSchema,
  bookAutherQuerySchema,
  bookAutherResponseSchema,
  bookAutherUpdateBodySchema,
  bookAutherUpdateSchemaType,
} from "./book-auther.schema";

export default fp(async (fastify): Promise<void> => {
  fastify.route<bookAutherGetListSchemaType>({
    method: "GET",
    url: "/",
    schema: {
      tags: ["bookAuther"],
      deprecated: false,
      hide: false,
      summary: "list of bookAuthers",
      description: "get a list of bookAuthers",
      querystring: bookAutherQuerySchema,
      response: {
        200: bookAutherListResponseSchema,
        400: errorSchema,
        404: errorSchema,
        500: errorSchema,
      },
      security: [{ bearerAuth: [] }],
    },
    handler: async (request, reply) => {
      const { skip, take } = request.pagination;
      const { filter } = request.query;
      const result = await fastify.bookAutherService.findAll({ skip, take, filter, request });
      const totalRecords = await fastify.bookAutherService.count({ filter, request });
      setPaginationHeaders({ reply, totalRecords, take, page: skip });
      return result;
    },
  });

  fastify.route<bookAutherCreateSchemaType>({
    method: "POST",
    url: "/",
    schema: {
      tags: ["bookAuther"],
      deprecated: false,
      hide: false,
      summary: "create bookAuther",
      description: "create a bookAuther",
      body: bookAutherCreateBodySchema,
      response: {
        200: bookAutherResponseSchema,
        400: errorSchema,
        404: errorSchema,
        500: errorSchema,
      },
      security: [{ bearerAuth: [] }],
    },
    handler: async (request) => {
      const data = request.body;
      const result = await fastify.bookAutherService.create({ data, request });
      return result;
    },
  });

  fastify.route<bookAutherGetOneSchemaType>({
    method: "GET",
    url: "/:id",
    schema: {
      tags: ["bookAuther"],
      deprecated: false,
      hide: false,
      summary: "get bookAuther by id",
      description: "get bookAuther by id",
      params: bookAutherParamSchema,
      response: {
        200: bookAutherResponseSchema,
        400: errorSchema,
        404: errorSchema,
        500: errorSchema,
      },
      security: [{ bearerAuth: [] }],
    },
    handler: async (request) => {
      const id = request.params.id;
      const result = await fastify.bookAutherService.findOne({ id, request });
      return result;
    },
  });

  fastify.route<bookAutherUpdateSchemaType>({
    method: "PUT",
    url: "/:id",
    schema: {
      tags: ["bookAuther"],
      deprecated: false,
      hide: false,
      summary: "update a bookAuther by id",
      description: "update a bookAuther by id",
      params: bookAutherParamSchema,
      body: bookAutherUpdateBodySchema,
      response: {
        200: bookAutherResponseSchema,
        400: errorSchema,
        404: errorSchema,
        500: errorSchema,
      },
      security: [{ bearerAuth: [] }],
    },
    handler: async (request) => {
      const data = request.body;
      const id = request.params.id;
      const result = await fastify.bookAutherService.update({ id, data, request });
      return result;
    },
  });

  fastify.route<bookAutherDeleteSchemaType>({
    method: "DELETE",
    url: "/:id",
    schema: {
      tags: ["bookAuther"],
      deprecated: false,
      hide: false,
      summary: "delete a bookAuther by id",
      description: "delete a bookAuther by id",
      params: bookAutherParamSchema,
      response: {
        200: messageResponseSchema,
        400: errorSchema,
        404: errorSchema,
        500: errorSchema,
      },
      security: [{ bearerAuth: [] }],
    },
    handler: async (request) => {
      const id = request.params.id;
      const result = await fastify.bookAutherService.remove({ id, request });
      return result;
    },
  });
});
