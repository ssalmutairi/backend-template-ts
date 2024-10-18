import argon2 from "argon2";
import fp from "fastify-plugin";
import { loginBodySchemaType, loginResponseSchemaType } from "../auth/auth.schema";
import { messageResponseSchemaType } from "../shared/common.schema";
import { FastifyRequest } from "fastify";

type loginType = {
  request?: FastifyRequest;
  data: loginBodySchemaType;
};

type logoutType = {
  request?: FastifyRequest;
  userId: number;
};

type AuthService = {
  login: (data: loginType) => Promise<loginResponseSchemaType>;
  logout: (data: logoutType) => Promise<messageResponseSchemaType>;
};

export default fp(async (fastify) => {
  const { prisma, httpErrors } = fastify;

  const authService: AuthService = {
    login: async ({ data }) => {
      return await prisma.$transaction(async (prisma) => {
        const user = await prisma.user.findFirst({
          where: { username: data.username, deletedAt: null },
        });

        if (!user) {
          throw httpErrors.notFound("user.error.notFound");
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await argon2.verify(user.password, data.password);
        if (!isMatch) {
          throw httpErrors.badRequest("auth.error.invalidCredentials");
        }

        const payload = {
          id: user.id,
          name: user.name,
          username: user.username,
        };

        const accessToken = await fastify.jwt.sign(payload, {
          expiresIn: `${process.env.JWT_EXPIRE}`,
        });

        // Create a date object for the current time in Riyadh timezone
        const currentTimeInRiyadh = new Date().toLocaleString("en-US", {
          timeZone: "Asia/Riyadh",
        });

        // Convert the string representation of the time to a Date object
        const accessTokenExp = new Date(currentTimeInRiyadh);

        // Add 3 days to the Riyadh time
        accessTokenExp.setDate(accessTokenExp.getDate() + 3);

        return {
          ...user,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString(),
          token: accessToken,
        };
      });
    },

    logout: async ({ userId }) => {
      return await prisma.$transaction(async (prisma) => {
        const user = await prisma.user.findFirst({
          where: {
            id: userId,
            sessions: {
              some: {
                active: true,
              },
            },
          },
        });

        if (!user) {
          throw httpErrors.notFound("user.error.notFound");
        }

        return { message: fastify.t("auth.messages.logout") };
      });
    },
  };

  // Decorate the fastify instance with the authService
  fastify.decorate("authService", authService);
});


declare module "fastify" {
  interface FastifyInstance {
    authService: AuthService;
  }
}
