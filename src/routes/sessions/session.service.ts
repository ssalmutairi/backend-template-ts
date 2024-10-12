import {
  createSessionSchemaType,
  updateSessionSchemaType,
  validateSessionSchemaType,
} from "../sessions/session.schema";
import fp from "fastify-plugin";

type createSessionType = {
  data: createSessionSchemaType;
};

type updateSessionType = {
  data: updateSessionSchemaType;
};

type validateSessionType = {
  data: validateSessionSchemaType;
};

interface SessionService {
  createSession: (data: createSessionType) => Promise<void>;
  updateSession: (data: updateSessionType) => Promise<void>;
  validSession: (data: validateSessionType) => Promise<boolean>;
}

const servicePlugin = fp(async (fastify) => {
  const { prisma, httpErrors } = fastify;

  const sessionService: SessionService = {
    createSession: async ({ data }) => {
      await prisma.$transaction(async (prisma) => {
        data.token = data.token?.replace("Bearer ", "");
        await prisma.session.create({
          data: { ...data, active: true },
        });
      });
    },

    updateSession: async ({ data }) => {
      await prisma.$transaction(async (prisma) => {
        const token = data.token?.replace("Bearer ", "");
        const session = await prisma.session.findFirst({
          where: { token, active: true },
        });
        if (!session) {
          throw httpErrors.notFound("session.error.notFound");
        }

        return await prisma.session.update({
          where: { id: session.id },
          data: { active: false, deletedAt: new Date() },
        });
      });
    },

    validSession: async ({ data }) => {
      return await prisma.$transaction(async (prisma) => {
        const token = data.token?.replace("Bearer ", "");
        const session = await prisma.session.findFirst({
          where: { token, active: true },
        });
        return !!session;
      });
    },
  };

  // Decorate the fastify instance with the sessionService
  fastify.decorate("sessionService", sessionService);
});

export default servicePlugin;

declare module "fastify" {
  interface FastifyInstance {
    sessionService: SessionService;
  }
}
