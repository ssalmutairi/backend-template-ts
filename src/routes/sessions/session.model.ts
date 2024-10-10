import { Static, Type } from "@sinclair/typebox";

export const sessionSchemaProperties = Type.Object({
  id: Type.String({ description: "session id" }),
  userId: Type.String({ description: "user id" }),
  token: Type.String({ description: "session token" }),
  active: Type.Boolean({ description: "session active" }),
  ip: Type.String({ description: "ip" }),
});
export type sessionSchemaPropertiesType = Static<typeof sessionSchemaProperties>;
