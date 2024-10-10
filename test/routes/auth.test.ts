import * as assert from "node:assert";
import { describe, test } from "node:test";
import { build } from "../helper";

describe("path: /api/auth", () => {
  let token: string;

  // test for valid login
  test("POST /api/auth/login - valid login", async (t) => {
    const app = await build(t);

    const res = await app.inject({
      method: "POST",
      url: "/api/auth/login",
      payload: {
        username: "admin",
        password: "123456",
      },
    });
    assert.equal(res.statusCode, 200);
    assert.ok(res);
    token = JSON.parse(res.payload).token;
  });

  // test for invalid username
  test("POST /api/auth/login - invalid username", async (t) => {
    const app = await build(t);

    const res = await app.inject({
      method: "POST",
      url: "/api/auth/login",
      payload: {
        username: "wrongUser",
        password: "password123",
      },
    });
    assert.equal(res.statusCode, 404);
  });

  // test for invalid password
  test("POST /api/auth/login - invalid password", async (t) => {
    const app = await build(t);

    const res = await app.inject({
      method: "POST",
      url: "/api/auth/login",
      payload: {
        username: "a_user1",
        password: "wrongPassword",
      },
    });
    assert.equal(res.statusCode, 404);
  });

  // test for missing username
  test("POST /api/auth/login - missing username", async (t) => {
    const app = await build(t);

    const res = await app.inject({
      method: "POST",
      url: "/api/auth/login",
      payload: {
        password: "password123",
      },
    });
    assert.equal(res.statusCode, 400);
  });

  // test for missing password
  test("POST /api/auth/login - missing password", async (t) => {
    const app = await build(t);

    const res = await app.inject({
      method: "POST",
      url: "/api/auth/login",
      payload: {
        username: "admin",
      },
    });
    assert.equal(res.statusCode, 400);
  });

  // test for empty username
  test("POST /api/auth/login - empty username", async (t) => {
    const app = await build(t);

    const res = await app.inject({
      method: "POST",
      url: "/api/auth/login",
      payload: {
        username: "",
        password: "password123",
      },
    });
    assert.equal(res.statusCode, 400);
  });

  // test for empty password
  test("POST /api/auth/login - empty password", async (t) => {
    const app = await build(t);

    const res = await app.inject({
      method: "POST",
      url: "/api/auth/login",
      payload: {
        username: "admin",
        password: "",
      },
    });
    assert.equal(res.statusCode, 400);
  });

  // test for logout
  test("POST /api/auth/logout - valid logout", async (t) => {
    const app = await build(t);

    const res = await app.inject({
      method: "POST",
      url: "/api/auth/logout",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      payload: {},
    });
    assert.equal(res.statusCode, 200);
  });

  // test for invalid token
  test("POST /api/auth/logout - invalid token", async (t) => {
    const app = await build(t);

    const res = await app.inject({
      method: "POST",
      url: "/api/auth/logout",
      headers: {
        Authorization: "Bearer invalidToken",
      },
    });
    assert.equal(res.statusCode, 401);
  });

  // test for missing token
  test("POST /api/auth/logout - missing token", async (t) => {
    const app = await build(t);

    const res = await app.inject({
      method: "POST",
      url: "/api/auth/logout",
    });
    assert.equal(res.statusCode, 401);
  });
});
