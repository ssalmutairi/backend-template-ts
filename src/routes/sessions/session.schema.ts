import { sessionSchemaProperties } from "./session.model";
import { auditableSchema, softDeleteSchema } from "../shared/common.schema";
import { Static, Type } from "@sinclair/typebox";

export const sessionSchema = Type.Composite([sessionSchemaProperties, auditableSchema, softDeleteSchema]);
export type sessionSchemaType = Static<typeof sessionSchema>;

export const createSessionSchema = Type.Pick(sessionSchemaProperties, ["userId", "token", "active", "ip"]);
export type createSessionSchemaType = Static<typeof createSessionSchema>;

export const updateSessionSchema = Type.Pick(sessionSchemaProperties, ["userId", "token"]);
export type updateSessionSchemaType = Static<typeof updateSessionSchema>;

export const validateSessionSchema = Type.Pick(sessionSchemaProperties, ["userId", "token"]);
export type validateSessionSchemaType = Static<typeof validateSessionSchema>;
