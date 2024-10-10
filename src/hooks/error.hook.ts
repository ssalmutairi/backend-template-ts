import "fastify";
import "prisma";
import fp from "fastify-plugin";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const i18next = require("i18next");

interface ErrorPluginOptions {}

export const errorPlugin = fp<ErrorPluginOptions>(async (fastify) => {
  fastify.setErrorHandler((error, request, reply) => {
    // log for debugging
    fastify.log.error(error);

    if (error.validation) {
      const { params, keyword, instancePath } = error.validation[0];
      params.missingProperty = params.missingProperty ?? instancePath.replace("/", "");
      const translatedErrors = i18next.t(`errors.validation.${keyword}`, params);

      reply.status(400).send({
        statusCode: 400,
        error: i18next.t("errors.validation.errorMessage"),
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

export default errorPlugin;
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
