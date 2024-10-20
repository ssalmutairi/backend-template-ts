import { Static, Type } from "@sinclair/typebox";
import { bookAutherSchema } from "./book-auther.model";
import { dateRageSchema, errorSchemaType, messageResponseSchemaType, paginationSchema } from "../shared/common.schema";

export const bookAutherParamSchema = Type.Composite([Type.Pick(bookAutherSchema, ["id"])]);
export type bookAutherParamSchemaType = Static<typeof bookAutherParamSchema>;

const bookAutherFilterSchema = Type.Composite([
  Type.Pick(bookAutherSchema, ["name"]),
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
export type bookAutherFilterSchemaType = Static<typeof bookAutherFilterSchema>;

export const bookAutherQuerySchema = Type.Composite([
  Type.Object({ filter: Type.Optional(bookAutherFilterSchema) }),
  paginationSchema,
]);
export type bookAutherQuerySchemaType = Static<typeof bookAutherQuerySchema>;

export const bookAutherCreateBodySchema = Type.Composite([Type.Pick(bookAutherSchema, ["name"])]);
export type bookAutherCreateBodySchemaType = Static<typeof bookAutherCreateBodySchema>;

export const bookAutherUpdateBodySchema = Type.Composite([Type.Omit(bookAutherCreateBodySchema, [])]);
export type bookAutherUpdateBodySchemaType = Static<typeof bookAutherUpdateBodySchema>;

export const bookAutherResponseSchema = Type.Composite([Type.Omit(bookAutherSchema, [])]);
export type bookAutherResponseSchemaType = Static<typeof bookAutherResponseSchema>;

export const bookAutherListResponseSchema = Type.Array(bookAutherResponseSchema);
export type bookAutherListResponseSchemaType = Static<typeof bookAutherListResponseSchema>;

export type bookAutherGetListSchemaType = {
  Querystring: bookAutherQuerySchemaType;
  Response: bookAutherListResponseSchemaType;
  Error: errorSchemaType;
};

export type bookAutherCreateSchemaType = {
  Body: bookAutherCreateBodySchemaType;
  Response: bookAutherResponseSchemaType;
  Error: errorSchemaType;
};

export type bookAutherGetOneSchemaType = {
  Params: bookAutherParamSchemaType;
  Response: bookAutherResponseSchemaType;
  Error: errorSchemaType;
};

export type bookAutherUpdateSchemaType = {
  Params: bookAutherParamSchemaType;
  Body: bookAutherUpdateBodySchemaType;
  Response: bookAutherResponseSchemaType;
  Error: errorSchemaType;
};

export type bookAutherDeleteSchemaType = {
  Params: bookAutherParamSchemaType;
  Response: messageResponseSchemaType;
};
