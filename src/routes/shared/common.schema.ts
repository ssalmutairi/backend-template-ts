import { Static, TSchema, Type } from "@sinclair/typebox";

export const Nullable = <T extends TSchema>(schema: T) => Type.Union([schema, Type.Null()]);

export const auditableSchema = Type.Object({
  updatedAt: Type.Any({ format: "date-time", description: "date updated" }),
  createdAt: Type.Any({ format: "date-time", description: "date created" }),
});
export type auditableSchemaType = Static<typeof auditableSchema>;

export const softDeleteSchema = Type.Object({
  deletedAt: Type.Union([Type.Any({ format: "date-time", description: "date deleted" }), Type.Null()]),
});
export type softDeleteSchemaType = Static<typeof softDeleteSchema>;

export const messageResponseSchema = Type.Object({
  message: Type.String({ description: "message" }),
});
export type messageResponseSchemaType = Static<typeof messageResponseSchema>;

export const errorSchema = Type.Object({
  statusCode: Type.Number({ description: "status code" }),
  error: Type.String({ description: "error" }),
  message: Type.String({ description: "message" }),
});
export type errorSchemaType = Static<typeof errorSchema>;

export const paginationSchema = Type.Object({
  page: Type.Number({ default: 1, description: "page number" }),
  pageSize: Type.Number({ default: 10, description: "page size" }),
});
export type paginationSchemaType = Static<typeof paginationSchema>;

export const dateRageSchema = Type.Object({
  from: Type.Optional(Type.String({ format: "date", description: "date from" })),
  to: Type.Optional(Type.String({ format: "date", description: "date to" })),
});
export type dateRageSchemaType = Static<typeof dateRageSchema>;

export const dateTimeRageSchema = Type.Object({
  from: Type.Optional(Type.String({ format: "date-time", description: "date time from" })),
  to: Type.Optional(Type.String({ format: "date-time", description: "date time to" })),
});
export type dateTimeRageSchemaType = Static<typeof dateTimeRageSchema>;
