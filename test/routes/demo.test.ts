import { test } from "tap";
import { app as plugins, options } from "../../src/app";
import fastify from "fastify";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongod: MongoMemoryServer;
test("path: /api/auth", async (t) => {
  mongod = await MongoMemoryServer.create();
  // Update the Prisma DATABASE_URL to use the in-memory MongoDB instance
  process.env.DATABASE_URL = mongod.getUri();
  const app = fastify();
  await app.register(plugins, options);
  t.teardown(async () => {
    console.log("Closing app...");
    if (app.prisma) {
      console.log("Disconnecting Prisma...");
      await app.prisma.$disconnect();
    }
    await app.close();
    await mongod.stop();
  });

  t.test("POST /api/auth/login - missing username", async (t) => {
    const res = await app.inject({
      method: "POST",
      url: "/api/auth/login",
      payload: {
        password: "password123",
      },
    });
    t.equal(res.statusCode, 400, "Response should have a status code of 400");
    t.end();
  });

  t.test("POST /api/auth/login - missing password", async (t) => {
    const res = await app.inject({
      method: "POST",
      url: "/api/auth/login",
      payload: {
        username: "admin",
      },
    });

    t.equal(res.statusCode, 400, "Response should have a status code of 400");
    t.end();
  });

  t.test("POST /api/auth/login - empty username", async (t) => {
    const res = await app.inject({
      method: "POST",
      url: "/api/auth/login",
      payload: {
        username: "",
        password: "password123",
      },
    });

    t.equal(res.statusCode, 400, "Response should have a status code of 400");
    t.end();
  });

  t.test("POST /api/auth/login - empty password", async (t) => {
    const res = await app.inject({
      method: "POST",
      url: "/api/auth/login",
      payload: {
        username: "admin",
        password: "",
      },
    });

    t.equal(res.statusCode, 400, "Response should have a status code of 400");
    t.end();
  });

  t.end();
});
