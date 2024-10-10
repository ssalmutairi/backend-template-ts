import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { setPaginationHeaders } from "../../helpers/common";
import { errorSchema, messageResponseSchema } from "../shared/common.schema";
import {
  resetPasswordBodySchema,
  resetPasswordSchemaType,
  userCreateBodySchema,
  userCreateSchemaType,
  userDeleteSchemaType,
  userGetListSchemaType,
  userGetOneSchemaType,
  userListResponseSchema,
  userParamSchema,
  userQuerySchema,
  userResponseSchema,
  userUpdateBodySchema,
  userUpdateSchemaType,
} from "./user.schema";

const users: FastifyPluginAsyncTypebox = async (fastify): Promise<void> => {
  fastify.route<userGetListSchemaType>({
    method: "GET",
    url: "/",
    schema: {
      tags: ["user"],
      deprecated: false,
      hide: false,
      summary: "create a user",
      description: "create a user",
      querystring: userQuerySchema,
      response: {
        200: userListResponseSchema,
        400: errorSchema,
        404: errorSchema,
        500: errorSchema,
      },
      security: [{ bearerAuth: [] }],
    },
    handler: async (request, reply) => {
      const { skip, take } = request.pagination;
      const { filter } = request.query;
      const result = await fastify.userService.findAll({ skip, take, filter, request });
      const totalRecords = await fastify.userService.count({ filter, request });
      setPaginationHeaders({ reply, totalRecords, take, page: skip });
      return result;
    },
  });

  fastify.route<userCreateSchemaType>({
    method: "POST",
    url: "/",
    schema: {
      tags: ["user"],
      deprecated: false,
      hide: false,
      summary: "create a user",
      description: "create a user",
      body: userCreateBodySchema,
      response: {
        200: userResponseSchema,
        400: errorSchema,
        404: errorSchema,
        500: errorSchema,
      },
      security: [{ bearerAuth: [] }],
    },
    handler: async (request) => {
      const data = request.body;
      const result = await fastify.userService.create({ data, request });
      return result;
    },
  });

  fastify.route<userGetOneSchemaType>({
    method: "GET",
    url: "/:id",
    schema: {
      tags: ["user"],
      deprecated: false,
      hide: false,
      summary: "get a user",
      description: "get a user",
      params: userParamSchema,
      response: {
        200: userResponseSchema,
        400: errorSchema,
        404: errorSchema,
        500: errorSchema,
      },
      security: [{ bearerAuth: [] }],
    },
    handler: async (request) => {
      const id = request.params.id;
      const result = await fastify.userService.findOne({ id, request });
      return result;
    },
  });

  fastify.route<userUpdateSchemaType>({
    method: "PUT",
    url: "/:id",
    schema: {
      tags: ["user"],
      deprecated: false,
      hide: false,
      summary: "update a user",
      description: "update a user",
      params: userParamSchema,
      body: userUpdateBodySchema,
      response: {
        200: userResponseSchema,
        400: errorSchema,
        404: errorSchema,
        500: errorSchema,
      },
      security: [{ bearerAuth: [] }],
    },
    handler: async (request) => {
      const data = request.body;
      const id = request.params.id;
      const result = await fastify.userService.update({ id, data, request });
      return result;
    },
  });

  fastify.route<userDeleteSchemaType>({
    method: "DELETE",
    url: "/:id",
    schema: {
      tags: ["user"],
      deprecated: false,
      hide: false,
      summary: "delete a user",
      description: "delete a user",
      params: userParamSchema,
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
      const result = await fastify.userService.remove({ id, request });
      return result;
    },
  });

  fastify.route<resetPasswordSchemaType>({
    method: "PUT",
    url: "/reset-password",
    schema: {
      tags: ["user"],
      deprecated: false,
      hide: false,
      summary: "reset user password request",
      description: "reset user password request",
      body: resetPasswordBodySchema,
      response: {
        200: messageResponseSchema,
        400: errorSchema,
        404: errorSchema,
        500: errorSchema,
      },
      security: [{ bearerAuth: [] }],
    },
    handler: async (request) => {
      const userId = request.user.id;
      const data = request.body;
      const result = fastify.userService.resetPassword({ userId, data, request });
      return result;
    },
  });
};

export default users;
