import { Static, Type } from "@sinclair/typebox";
import { userSchemaProperties } from "./user.model";
import {
  auditableSchema,
  dateRageSchema,
  errorSchemaType,
  messageResponseSchemaType,
  paginationSchema,
  softDeleteSchema,
} from "../shared/common.schema";

export const userSchema = Type.Composite([userSchemaProperties, auditableSchema, softDeleteSchema]);
export type userSchemaType = Static<typeof userSchema>;

export const userParamSchema = Type.Composite([Type.Pick(userSchema, ["id"])]);
export type userParamSchemaType = Static<typeof userParamSchema>;

const userFilterSchema = Type.Composite([
  Type.Pick(userSchema, ["name", "username"]),
  Type.Object({
    createdAt: Type.Optional(dateRageSchema),
    orderBy: Type.Optional(
      Type.Object({
        field: Type.String({ default: "createdAt" }),
        direction: Type.String({ enum: ["asc", "desc"], default: "desc" }),
      }),
    ),
  }),
]);
export type userFilterSchemaType = Static<typeof userFilterSchema>;
export const userQuerySchema = Type.Composite([
  Type.Object({
    filter: Type.Optional(userFilterSchema),
  }),
  paginationSchema,
]);
export type userQuerySchemaType = Static<typeof userQuerySchema>;

export const userCreateBodySchema = Type.Composite([Type.Pick(userSchema, ["name", "username", "password"])]);
export type userCreateBodySchemaType = Static<typeof userCreateBodySchema>;

export const userUpdateBodySchema = Type.Composite([Type.Omit(userCreateBodySchema, ["password"])]);
export type userUpdateBodySchemaType = Static<typeof userUpdateBodySchema>;

export const resetPasswordBodySchema = Type.Object({
  currentPassword: Type.String({ minLength: 6, maxLength: 50, description: "current password" }),
  newPassword: Type.String({ minLength: 6, maxLength: 50, description: "new password" }),
});
export type resetPasswordBodySchemaType = Static<typeof resetPasswordBodySchema>;

export const userResponseSchema = Type.Composite([Type.Omit(userSchema, ["password", "deletedAt"])]);
export type userResponseSchemaType = Static<typeof userResponseSchema>;

export const userListResponseSchema = Type.Array(userResponseSchema);
export type userListResponseSchemaType = Static<typeof userListResponseSchema>;

export type userGetListSchemaType = {
  Querystring: userQuerySchemaType;
  Response: userListResponseSchemaType;
  Error: errorSchemaType;
};

export type userCreateSchemaType = {
  Body: userCreateBodySchemaType;
  Response: userResponseSchemaType;
  Error: errorSchemaType;
};

export type userGetOneSchemaType = {
  Params: userParamSchemaType;
  Response: userResponseSchemaType;
  Error: errorSchemaType;
};

export type userUpdateSchemaType = {
  Params: userParamSchemaType;
  Body: userUpdateBodySchemaType;
  Response: userResponseSchemaType;
  Error: errorSchemaType;
};

export type userDeleteSchemaType = {
  Params: userParamSchemaType;
  Response: messageResponseSchemaType;
};

export type resetPasswordSchemaType = {
  Body: resetPasswordBodySchemaType;
  Response: messageResponseSchemaType;
  Error: errorSchemaType;
};
