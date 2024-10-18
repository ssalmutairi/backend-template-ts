import fp from "fastify-plugin";
import { FastifyRequest } from "fastify";
import { messageResponseSchemaType } from "../shared/common.schema";
import {
  sampleCreateBodySchemaType,
  sampleFilterSchemaType,
  sampleListResponseSchemaType,
  sampleResponseSchemaType,
  sampleUpdateBodySchemaType
} from "./sample.schema";

type sampleFindAllType = {
  request?: FastifyRequest;
  skip: number;
  take: number;
  filter: sampleFilterSchemaType;
};
type sampleCreateType = {
  request?: FastifyRequest;
  data: sampleCreateBodySchemaType;
};

type sampleFindOneType = {
  request?: FastifyRequest;
  id: number;
};

type sampleUpdateType = {
  request?: FastifyRequest;
  data: sampleUpdateBodySchemaType;
  id: number;
};

type sampleDeleteType = {
  request?: FastifyRequest;
  id: number;
};

interface SampleService {
  findAll(data: sampleFindAllType): Promise<sampleListResponseSchemaType>;
  create: (data: sampleCreateType) => Promise<sampleResponseSchemaType>;
  findOne: (data: sampleFindOneType) => Promise<sampleResponseSchemaType | null>;
  update: (data: sampleUpdateType) => Promise<sampleResponseSchemaType>;
  remove: (data: sampleDeleteType) => Promise<messageResponseSchemaType>;
  count: (data: Partial<sampleFindAllType>) => Promise<number>;
}

export default fp(async (fastify) => {
  const {
    prisma,
    // httpErrors
  } = fastify;

  const sampleService: SampleService = {
    findAll: async ({ skip, take, filter, request }) => {
      //TODO: implement your logic here

      return [];
    },
    create: async ({ data }) => {
      //TODO: implement your logic here
      return { id: 1, createdAt: new Date(), updatedAt: new Date() };
    },
    findOne: async ({ id, request }) => {
      //TODO: implement your logic here
      return { id: 1, createdAt: new Date(), updatedAt: new Date() };
    },
    update: async ({ id, data }) => {
      //TODO: implement your logic here
      return { id: 1, createdAt: new Date(), updatedAt: new Date() };
    },
    remove: async ({ id }) => {
      //TODO: implement your logic here
      return { message: fastify.t("samples.messages.deleted") };
    },
    count: async ({ filter }) => {
      return await prisma.$transaction(async (prisma) => {
        //TODO: implement your logic here
        return 0;
      });
    },
  };

  fastify.decorate("sampleService", sampleService);
});

declare module "fastify" {
  interface FastifyInstance {
    sampleService: SampleService;
  }
}
