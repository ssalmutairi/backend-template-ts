import swagger from "@fastify/swagger";
import swaggerUi, { FastifySwaggerUiOptions } from "@fastify/swagger-ui";
import fp from "fastify-plugin";

export default fp<FastifySwaggerUiOptions>(
  async (fastify) => {
    fastify.register(swagger, {
      openapi: {
        info: {
          title: "API Documentation",
          description: "details of the API",
          version: "1.0.0",
        },
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT", // Optional, specifying the format of the bearer token
            },
          },
        },
      },
    });

    fastify.register(swaggerUi, {
      routePrefix: "/documentation",
      uiConfig: {
        docExpansion: "list",
        deepLinking: false,
      },
      uiHooks: {
        onRequest: function (request, reply, next) {
          next();
        },

        preHandler: function (request, reply, next) {
          next();
        },
      },
      staticCSP: true,
      transformStaticCSP: (header) => header,

      transformSpecification: (swaggerObject) => {
        return swaggerObject;
      },
      transformSpecificationClone: true,
    });
  },
  { name: "swagger" },
);
