import { Static, Type } from "@sinclair/typebox";

export const sampleSchema = Type.Object({
  id: Type.Number({ description: "id" }),
  //TODO: add properties
  createdAt: Type.Any({ format: "date-time", description: "date created" }),
  updatedAt: Type.Any({ format: "date-time", description: "date updated" }),
});
export type sampleSchemaType = Static<typeof sampleSchema>;
