import { Static, Type } from "@sinclair/typebox";

export const bookAutherSchema = Type.Object({
  id: Type.Number({ description: "id" }),
  //TODO: add properties
  createdAt: Type.Any({ format: "date-time", description: "date created" }),
  updatedAt: Type.Any({ format: "date-time", description: "date updated" }),
});
export type bookAutherSchemaType = Static<typeof bookAutherSchema>;
