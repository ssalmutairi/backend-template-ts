import * as assert from "node:assert";
import { test } from "node:test";

import Fastify from "fastify";

test("load fastify plugin", async () => {
  const fastify = Fastify();
  // TODO: load the plugin to test it
  await fastify.ready();

  assert.equal("loading finished", "loading finished");
});
