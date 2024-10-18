import fp from "fastify-plugin";
const i18next = require("i18next");

export default fp(async (fastify) => {
  fastify.addHook("preHandler", async (request) => {
    let language = request.headers["accept-language"] || "en";
    const acceptedLanguages = ["en", "ar"];
    for (const lang of acceptedLanguages) {
      if (language.includes(lang)) {
        language = lang;
        break;
      }
    }

    if (language) await i18next.changeLanguage(language);
  });
});
