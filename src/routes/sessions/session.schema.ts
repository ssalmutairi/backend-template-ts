import { sessionSchema } from "./session.model";
import { Static, Type } from "@sinclair/typebox";

export const createSessionSchema = Type.Pick(sessionSchema, ["userId", "token", "active", "ip"]);
export type createSessionSchemaType = Static<typeof createSessionSchema>;

export const updateSessionSchema = Type.Pick(sessionSchema, ["userId", "token"]);
export type updateSessionSchemaType = Static<typeof updateSessionSchema>;

export const validateSessionSchema = Type.Pick(sessionSchema, ["userId", "token"]);
export type validateSessionSchemaType = Static<typeof validateSessionSchema>;
