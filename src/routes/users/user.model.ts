import { Static, Type } from "@sinclair/typebox";

export const userSchemaProperties = Type.Object({
  id: Type.String({ format: "uuid", description: "user id" }),
  name: Type.String({ minLength: 3, maxLength: 30, description: "user name" }),
  username: Type.String({ minLength: 3, maxLength: 50, description: "user username" }),
  password: Type.String({ minLength: 6, maxLength: 32, description: "user password" }),
});
export type userSchemaPropertiesType = Static<typeof userSchemaProperties>;
