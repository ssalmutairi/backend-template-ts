import fp from "fastify-plugin";
import qs from "qs";
export interface QsPluginOptions {
  disabled?: boolean;
  disablePrefixTrim?: boolean;
}

export default fp<QsPluginOptions>(
  async (fastify, options) => {
    fastify.addHook("onRequest", (request, reply, done) => {
      if (options && options.disabled) {
        return done();
      }
      const rawUrl = request.raw.url || "";
      let url = rawUrl;
      if (!(options && options.disablePrefixTrim)) {
        url = rawUrl.replace(/\?{2,}/, "?");
      }
      const querySymbolIndex = url.indexOf("?");
      const query = querySymbolIndex !== -1 ? url.slice(querySymbolIndex + 1) : "";
      request.query = qs.parse(query, options);
      done();
    });
  },
  { name: "qs" },
);
