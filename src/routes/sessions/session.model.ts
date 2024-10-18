import { Static, Type } from "@sinclair/typebox";

export const sessionSchema = Type.Object({
  id: Type.Number({ description: "session id" }),
  userId: Type.Number({ description: "user id" }),
  token: Type.String({ description: "session token" }),
  active: Type.Boolean({ description: "session active" }),
  ip: Type.String({ description: "ip" }),
  createdAt: Type.Any({ format: "date-time", description: "date created" }),
  updatedAt: Type.Any({ format: "date-time", description: "date updated" }),
  deletedAt: Type.Union([Type.Any({ format: "date-time", description: "date deleted" }), Type.Null()]),
});
export type sessionSchemaType = Static<typeof sessionSchema>;
