import { Static, Type } from "@sinclair/typebox";
import { userSchema } from "../users/user.model";
import { errorSchemaType, messageResponseSchemaType } from "../shared/common.schema";

export const loginBodySchema = Type.Pick(userSchema, ["username", "password"]);
export type loginBodySchemaType = Static<typeof loginBodySchema>;

export const loginResponseSchema = Type.Composite([
  Type.Omit(userSchema, ["password", "createdAt", "updatedAt", "deletedAt"]),
  Type.Object({
    token: Type.String({ description: "token" }),
  }),
]);
export type loginResponseSchemaType = Static<typeof loginResponseSchema>;

export type loginSchemaType = {
  Body: loginBodySchemaType;
  Response: loginResponseSchemaType;
  Error: errorSchemaType;
};

export type logoutSchemaType = {
  Response: messageResponseSchemaType;
  Error: errorSchemaType;
  Body: never; // no body
};
