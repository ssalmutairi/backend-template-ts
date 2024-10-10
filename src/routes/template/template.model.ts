import { Static, Type } from "@sinclair/typebox";

export const templateSchemaProperties = Type.Object({
  id: Type.String({ format: "uuid", description: "id" }),
  //TODO: add properties
});
export type templateSchemaPropertiesType = Static<typeof templateSchemaProperties>;
