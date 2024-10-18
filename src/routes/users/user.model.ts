import { Static, Type } from "@sinclair/typebox";

export const userSchema = Type.Object({
  id: Type.Number({ description: "user id" }),
  name: Type.String({ minLength: 3, maxLength: 30, description: "user name" }),
  username: Type.String({ minLength: 3, maxLength: 50, description: "user username" }),
  password: Type.String({ minLength: 6, maxLength: 32, description: "user password" }),
  createdAt: Type.Any({ format: "date-time", description: "date created" }),
  updatedAt: Type.Any({ format: "date-time", description: "date updated" }),
  deletedAt: Type.Union([Type.Any({ format: "date-time", description: "date deleted" }), Type.Null()]),
});
export type userSchemaType = Static<typeof userSchema>;
