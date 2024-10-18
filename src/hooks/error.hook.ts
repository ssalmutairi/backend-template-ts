import "fastify";
import "prisma";
import fp from "fastify-plugin";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const i18next = require("i18next");

interface ErrorPluginOptions {}

declare module "fastify" {
  interface FastifySchemaValidationError {
    keyword: string;
    instancePath: string;
    schemaPath: string;
    params: {
      missingProperty?: string | undefined;
      [key: string]: string | number | boolean | undefined;
    };
    message?: string;
  }

  interface FastifyContextConfig {
    fieldTranslations?: Record<string, string>;
  }
}


export default fp<ErrorPluginOptions>(async (fastify) => {
  fastify.setErrorHandler((error, request, reply) => {
    // log for debugging
    fastify.log.error(error);

    if (error.validation) {
      const { params, keyword, instancePath } = error.validation[0];
      let translatedErrors;

      params.missingProperty = params.missingProperty ?? instancePath.replace("/", "");
      translatedErrors = i18next.t(`app.validation.${keyword}`, params);

      if (keyword === "format" && params.format === "uuid") {
        params.property = instancePath.replace("/", "");
        translatedErrors = i18next.t("app.validation.format", params);
      }

      reply.status(400).send({
        statusCode: 400,
        error: i18next.t("app.validation.failed"),
        message: translatedErrors,
      });
    } else {
      const statusCode = error.statusCode ?? 500;
      const internalServerError = "app.error.internalServerError";
      reply.code(statusCode).send({
        statusCode: statusCode,
        error: statusCode !== 500 ? i18next.t(error.message) : i18next.t(internalServerError),
        message: statusCode !== 500 ? i18next.t(error.message) : i18next.t(internalServerError),
      });
    }
  });
});


