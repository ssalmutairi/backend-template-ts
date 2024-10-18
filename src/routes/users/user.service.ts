import fp from "fastify-plugin";
import {
  resetPasswordBodySchemaType,
  userCreateBodySchemaType,
  userFilterSchemaType,
  userListResponseSchemaType,
  userResponseSchemaType,
  userUpdateBodySchemaType,
} from "./user.schema";
import { messageResponseSchemaType } from "../shared/common.schema.js";
import { FastifyRequest } from "fastify";
import { comparePassword, hashPassword } from "../../helpers/common.js";

type userFindAllType = {
  request?: FastifyRequest;
  skip: number;
  take: number;
  filter: userFilterSchemaType | undefined;
};
type userCreateType = {
  request?: FastifyRequest;
  data: userCreateBodySchemaType;
};

type userFindOneType = {
  request?: FastifyRequest;
  id: number;
};

type userUpdateType = {
  request?: FastifyRequest;
  data: userUpdateBodySchemaType;
  id: number;
};

type userDeleteType = {
  request?: FastifyRequest;
  id: number;
};

type resetPasswordType = {
  request?: FastifyRequest;
  userId: number;
  data: resetPasswordBodySchemaType;
};

interface UserService {
  findAll(data: userFindAllType): Promise<userListResponseSchemaType>;
  create: (data: userCreateType) => Promise<userResponseSchemaType>;
  findOne: (data: userFindOneType) => Promise<userResponseSchemaType | null>;
  update: (data: userUpdateType) => Promise<userResponseSchemaType>;
  remove: (data: userDeleteType) => Promise<messageResponseSchemaType>;
  count: (data: Partial<userFindAllType>) => Promise<number>;
  resetPassword: (data: resetPasswordType) => Promise<messageResponseSchemaType>;
}

export default fp(async (fastify) => {
  const { prisma, httpErrors } = fastify;

  // const _findOneById = async (id: string) => {
  //   return await prisma.user.findFirst({
  //     where: { id, deletedAt: null },
  //   });
  // };

  const _findOneByUsername = async (username: string, notIn: number[] = []) => {
    return await prisma.user.findFirst({
      where: { username, id: { notIn } },
    });
  };
  const userService: UserService = {
    findAll: async ({ skip, take, filter }) => {
      const users = await prisma.$transaction(async (prisma) => {
        return await prisma.user.findMany({
          where: {
            deletedAt: null,
            ...(filter?.username && { username: { contains: filter.username } }),
            ...(filter?.name && { name: { contains: filter.name } }),
          },
          orderBy: [
            {
              [filter?.orderBy?.field ?? "createdAt"]: filter?.orderBy?.direction ?? "desc",
            },
          ],
          skip,
          take,
        });
      });

      return users;
    },
    create: async ({ data }) => {
      const user = await prisma.$transaction(async (prisma) => {
        // check if username exist
        if (await _findOneByUsername(data.username)) {
          throw httpErrors.badRequest("user.error.usernameAlreadyExists");
        }

        // hash password
        data.password = await hashPassword(data.password!);

        const user = await prisma.user.create({
          data: {
            ...data,
            deletedAt: null,
          },
        });

        return user;
      });

      return user;
    },
    findOne: async ({ id }) => {
      const user = await prisma.$transaction(async (prisma) => {
        const user = await prisma.user.findFirst({
          where: { id, deletedAt: null },
        });

        if (!user) {
          throw httpErrors.notFound("user.error.notFound");
        }

        return user;
      });

      return user;
    },
    update: async ({ id, data }) => {
      const updatedUser = await prisma.$transaction(async (prisma) => {
        // check if user exist
        const user = await prisma.user.findFirst({
          where: { id, deletedAt: null },
        });
        if (!user) {
          throw httpErrors.notFound("user.error.notFound");
        }

        // check if username exist
        if (data.username && (await _findOneByUsername(data.username, [user.id]))) {
          throw httpErrors.notFound("user.error.usernameAlreadyExists");
        }

        const updatedUser = await prisma.user.update({
          where: { id: user.id },
          data: {
            ...data,
          },
        });

        return updatedUser;
      });

      return updatedUser;
    },
    remove: async ({ id }) => {
      await prisma.$transaction(async (prisma) => {
        // check if user exist
        const user = await prisma.user.findFirst({
          where: { id, deletedAt: null },
        });
        if (!user) {
          throw httpErrors.notFound("user.error.notFound");
        }

        await prisma.user.update({
          where: { id: user.id },
          data: {
            deletedAt: new Date(),
          },
        });
      });

      return { message: fastify.t("users.messages.deleted") };
    },
    count: async ({ filter }) => {
      return await prisma.$transaction(async (prisma) => {
        return await prisma.user.count({
          where: {
            deletedAt: null,
            ...(filter?.username && { username: { contains: filter.username } }),
            ...(filter?.name && { name: { contains: filter.name } }),
          },
        });
      });
    },
    resetPassword: async ({ userId, data }) => {
      return await prisma.$transaction(async (prisma) => {
        const user = await prisma.user.findFirst({
          where: { id: userId, deletedAt: null },
        });

        if (!user) {
          throw httpErrors.notFound("user.error.notFound");
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await comparePassword(data.currentPassword, user.password);
        if (!isMatch) {
          throw httpErrors.unauthorized("user.error.passwordMismatch");
        }
        const newPassword = await hashPassword(data.newPassword!);

        await prisma.user.update({
          where: { id: userId },
          data: { password: newPassword },
        });
        return { message: fastify.t("users.messages.passwordReset") };
      });
    },
  };

  fastify.decorate("userService", userService);
});

declare module "fastify" {
  interface FastifyInstance {
    userService: UserService;
  }
}