// This file contains code that we reuse between our tests.
import * as helper from "fastify-cli/helper";
import * as path from "path";
import * as test from "node:test";

export type TestContext = {
  after: typeof test.after;
};

const AppPath = path.join(__dirname, "..", "src", "app.ts");

// Fill in this config with all the configurations
// needed for testing the application
async function config() {
  return {};
}

// Automatically build and tear down our instance
async function build(t: TestContext) {
  // you can set all the options supported by the fastify CLI command
  const argv = [AppPath];
  process.env.NODE_ENV = "test";
  process.env.FASTIFY_LOG_LEVEL = "silent";
  // fastify-plugin ensures that all decorators
  // are exposed for testing purposes, this is
  // different from the production setup
  const app = await helper.build(argv, await config());

  // Tear down our app after we are done
  t.after(async () => await app.close());

  return app;
}

export { config, build };
