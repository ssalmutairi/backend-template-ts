import fp from "fastify-plugin";
import { messageResponseSchemaType } from "../shared/common.schema";
import { FastifyRequest } from "fastify";

type templateFindAllType = {
  request?: FastifyRequest;
  skip: number;
  take: number;
  filter: any; //TODO: define filter type
};
type templateCreateType = {
  request?: FastifyRequest;
  data: any; //TODO: define filter type
};

type templateFindOneType = {
  request?: FastifyRequest;
  id: string;
};

type templateUpdateType = {
  request?: FastifyRequest;
  data: any; //TODO: define filter type
  id: string;
};

type templateDeleteType = {
  request?: FastifyRequest;
  id: string;
};

interface TemplateService {
  findAll(data: templateFindAllType): Promise<any>; //TODO: define response type
  create: (data: templateCreateType) => Promise<any>; //TODO: define response type
  findOne: (data: templateFindOneType) => Promise<any | null>; //TODO: define response type
  update: (data: templateUpdateType) => Promise<any>; //TODO: define response type
  remove: (data: templateDeleteType) => Promise<messageResponseSchemaType>;
  count: (data: Partial<templateFindAllType>) => Promise<number>;
}

const servicePlugin = fp(async (fastify) => {
  const {
    prisma,
    // httpErrors
  } = fastify;

  const templateService: TemplateService = {
    findAll: async ({ skip, take, filter, request }) => {
      return await prisma.$transaction(async (prisma) => {
        //TODO: implement your logic here
      });
    },
    create: async ({ data }) => {
      return await prisma.$transaction(async (prisma) => {
        //TODO: implement your logic here
      });
    },
    findOne: async ({ id, request }) => {
      return await prisma.$transaction(async (prisma) => {
        //TODO: implement your logic here
      });
    },
    update: async ({ id, data }) => {
      return await prisma.$transaction(async (prisma) => {
        //TODO: implement your logic here
      });
    },
    remove: async ({ id }) => {
      await prisma.$transaction(async (prisma) => {
        //TODO: implement your logic here
      });

      return { message: fastify.t("templates.messages.deleted") };
    },
    count: async ({ filter }) => {
      return await prisma.$transaction(async (prisma) => {
        //TODO: implement your logic here
        return 0;
      });
    },
  };

  fastify.decorate("templateService", templateService);
});

export default servicePlugin;

declare module "fastify" {
  interface FastifyInstance {
    templateService: TemplateService;
  }
}
