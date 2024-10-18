import fp from "fastify-plugin";

import { setPaginationHeaders } from "../../helpers/common";
import { errorSchema, messageResponseSchema } from "../shared/common.schema";
import {
  sampleCreateBodySchema,
  sampleCreateSchemaType,
  sampleDeleteSchemaType,
  sampleGetListSchemaType,
  sampleGetOneSchemaType,
  sampleListResponseSchema,
  sampleParamSchema,
  sampleQuerySchema,
  sampleResponseSchema,
  sampleUpdateBodySchema,
  sampleUpdateSchemaType,
} from "./sample.schema";

export default fp(async (fastify): Promise<void> => {
  fastify.route<sampleGetListSchemaType>({
    method: "GET",
    url: "/",
    schema: {
      tags: ["sample"],
      deprecated: false,
      hide: false,
      summary: "list of samples",
      description: "get a list of samples",
      querystring: sampleQuerySchema,
      response: {
        200: sampleListResponseSchema,
        400: errorSchema,
        404: errorSchema,
        500: errorSchema,
      },
      security: [{ bearerAuth: [] }],
    },
    handler: async (request, reply) => {
      const { skip, take } = request.pagination;
      const { filter } = request.query;
      const result = await fastify.sampleService.findAll({ skip, take, filter, request });
      const totalRecords = await fastify.sampleService.count({ filter, request });
      setPaginationHeaders({ reply, totalRecords, take, page: skip });
      return result;
    },
  });

  fastify.route<sampleCreateSchemaType>({
    method: "POST",
    url: "/",
    schema: {
      tags: ["sample"],
      deprecated: false,
      hide: false,
      summary: "create sample",
      description: "create a sample",
      body: sampleCreateBodySchema,
      response: {
        200: sampleResponseSchema,
        400: errorSchema,
        404: errorSchema,
        500: errorSchema,
      },
      security: [{ bearerAuth: [] }],
    },
    handler: async (request) => {
      const data = request.body;
      const result = await fastify.sampleService.create({ data, request });
      return result;
    },
  });

  fastify.route<sampleGetOneSchemaType>({
    method: "GET",
    url: "/:id",
    schema: {
      tags: ["sample"],
      deprecated: false,
      hide: false,
      summary: "get sample by id",
      description: "get sample by id",
      params: sampleParamSchema,
      response: {
        200: sampleResponseSchema,
        400: errorSchema,
        404: errorSchema,
        500: errorSchema,
      },
      security: [{ bearerAuth: [] }],
    },
    handler: async (request) => {
      const id = request.params.id;
      const result = await fastify.sampleService.findOne({ id, request });
      return result;
    },
  });

  fastify.route<sampleUpdateSchemaType>({
    method: "PUT",
    url: "/:id",
    schema: {
      tags: ["sample"],
      deprecated: false,
      hide: false,
      summary: "update a sample by id",
      description: "update a sample by id",
      params: sampleParamSchema,
      body: sampleUpdateBodySchema,
      response: {
        200: sampleResponseSchema,
        400: errorSchema,
        404: errorSchema,
        500: errorSchema,
      },
      security: [{ bearerAuth: [] }],
    },
    handler: async (request) => {
      const data = request.body;
      const id = request.params.id;
      const result = await fastify.sampleService.update({ id, data, request });
      return result;
    },
  });

  fastify.route<sampleDeleteSchemaType>({
    method: "DELETE",
    url: "/:id",
    schema: {
      tags: ["sample"],
      deprecated: false,
      hide: false,
      summary: "delete a sample by id",
      description: "delete a sample by id",
      params: sampleParamSchema,
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
      const result = await fastify.sampleService.remove({ id, request });
      return result;
    },
  });
});
