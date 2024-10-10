import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { setPaginationHeaders } from "../../helpers/common";
import { errorSchema, messageResponseSchema } from "../shared/common.schema";
import {
  templateCreateBodySchema,
  templateCreateSchemaType,
  templateDeleteSchemaType,
  templateGetListSchemaType,
  templateGetOneSchemaType,
  templateListResponseSchema,
  templateParamSchema,
  templateQuerySchema,
  templateResponseSchema,
  templateUpdateBodySchema,
  templateUpdateSchemaType,
} from "./template.schema";

const templates: FastifyPluginAsyncTypebox = async (fastify): Promise<void> => {
  fastify.route<templateGetListSchemaType>({
    method: "GET",
    url: "/",
    schema: {
      tags: ["template"],
      deprecated: false,
      hide: false,
      summary: "create a template",
      description: "create a template",
      querystring: templateQuerySchema,
      response: {
        200: templateListResponseSchema,
        400: errorSchema,
        404: errorSchema,
        500: errorSchema,
      },
      security: [{ bearerAuth: [] }],
    },
    handler: async (request, reply) => {
      const { skip, take } = request.pagination;
      const { filter } = request.query;
      const result = await fastify.templateService.findAll({ skip, take, filter, request });
      const totalRecords = await fastify.templateService.count({ filter, request });
      setPaginationHeaders({ reply, totalRecords, take, page: skip });
      return result;
    },
  });

  fastify.route<templateCreateSchemaType>({
    method: "POST",
    url: "/",
    schema: {
      tags: ["template"],
      deprecated: false,
      hide: false,
      summary: "create a template",
      description: "create a template",
      body: templateCreateBodySchema,
      response: {
        200: templateResponseSchema,
        400: errorSchema,
        404: errorSchema,
        500: errorSchema,
      },
      security: [{ bearerAuth: [] }],
    },
    handler: async (request) => {
      const data = request.body;
      const result = await fastify.templateService.create({ data, request });
      return result;
    },
  });

  fastify.route<templateGetOneSchemaType>({
    method: "GET",
    url: "/:id",
    schema: {
      tags: ["template"],
      deprecated: false,
      hide: false,
      summary: "get a template",
      description: "get a template",
      params: templateParamSchema,
      response: {
        200: templateResponseSchema,
        400: errorSchema,
        404: errorSchema,
        500: errorSchema,
      },
      security: [{ bearerAuth: [] }],
    },
    handler: async (request) => {
      const id = request.params.id;
      const result = await fastify.templateService.findOne({ id, request });
      return result;
    },
  });

  fastify.route<templateUpdateSchemaType>({
    method: "PUT",
    url: "/:id",
    schema: {
      tags: ["template"],
      deprecated: false,
      hide: false,
      summary: "update a template",
      description: "update a template",
      params: templateParamSchema,
      body: templateUpdateBodySchema,
      response: {
        200: templateResponseSchema,
        400: errorSchema,
        404: errorSchema,
        500: errorSchema,
      },
      security: [{ bearerAuth: [] }],
    },
    handler: async (request) => {
      const data = request.body;
      const id = request.params.id;
      const result = await fastify.templateService.update({ id, data, request });
      return result;
    },
  });

  fastify.route<templateDeleteSchemaType>({
    method: "DELETE",
    url: "/:id",
    schema: {
      tags: ["template"],
      deprecated: false,
      hide: false,
      summary: "delete a template",
      description: "delete a template",
      params: templateParamSchema,
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
      const result = await fastify.templateService.remove({ id, request });
      return result;
    },
  });
};

export default templates;
