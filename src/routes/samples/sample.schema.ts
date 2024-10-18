import { Static, Type } from "@sinclair/typebox";
import { sampleSchema } from "./sample.model";
import { dateRageSchema, errorSchemaType, messageResponseSchemaType, paginationSchema } from "../shared/common.schema";

export const sampleParamSchema = Type.Composite([Type.Pick(sampleSchema, ["id"])]);
export type sampleParamSchemaType = Static<typeof sampleParamSchema>;

const sampleFilterSchema = Type.Composite([
  Type.Pick(sampleSchema, ["name"]),
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
export type sampleFilterSchemaType = Static<typeof sampleFilterSchema>;

export const sampleQuerySchema = Type.Composite([
  Type.Object({ filter: Type.Optional(sampleFilterSchema) }),
  paginationSchema,
]);
export type sampleQuerySchemaType = Static<typeof sampleQuerySchema>;

export const sampleCreateBodySchema = Type.Composite([Type.Pick(sampleSchema, ["name"])]);
export type sampleCreateBodySchemaType = Static<typeof sampleCreateBodySchema>;

export const sampleUpdateBodySchema = Type.Composite([Type.Omit(sampleCreateBodySchema, [])]);
export type sampleUpdateBodySchemaType = Static<typeof sampleUpdateBodySchema>;

export const sampleResponseSchema = Type.Composite([Type.Omit(sampleSchema, [])]);
export type sampleResponseSchemaType = Static<typeof sampleResponseSchema>;

export const sampleListResponseSchema = Type.Array(sampleResponseSchema);
export type sampleListResponseSchemaType = Static<typeof sampleListResponseSchema>;

export type sampleGetListSchemaType = {
  Querystring: sampleQuerySchemaType;
  Response: sampleListResponseSchemaType;
  Error: errorSchemaType;
};

export type sampleCreateSchemaType = {
  Body: sampleCreateBodySchemaType;
  Response: sampleResponseSchemaType;
  Error: errorSchemaType;
};

export type sampleGetOneSchemaType = {
  Params: sampleParamSchemaType;
  Response: sampleResponseSchemaType;
  Error: errorSchemaType;
};

export type sampleUpdateSchemaType = {
  Params: sampleParamSchemaType;
  Body: sampleUpdateBodySchemaType;
  Response: sampleResponseSchemaType;
  Error: errorSchemaType;
};

export type sampleDeleteSchemaType = {
  Params: sampleParamSchemaType;
  Response: messageResponseSchemaType;
};
