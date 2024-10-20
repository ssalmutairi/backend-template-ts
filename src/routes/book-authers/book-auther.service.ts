import fp from "fastify-plugin";
import { FastifyRequest } from "fastify";
import { messageResponseSchemaType } from "../shared/common.schema";
import {
  bookAutherCreateBodySchemaType,
  bookAutherFilterSchemaType,
  bookAutherListResponseSchemaType,
  bookAutherResponseSchemaType,
  bookAutherUpdateBodySchemaType,
} from "./book-auther.schema";

type bookAutherFindAllType = {
  request?: FastifyRequest;
  skip: number;
  take: number;
  filter: bookAutherFilterSchemaType;
};
type bookAutherCreateType = {
  request?: FastifyRequest;
  data: bookAutherCreateBodySchemaType;
};

type bookAutherFindOneType = {
  request?: FastifyRequest;
  id: number;
};

type bookAutherUpdateType = {
  request?: FastifyRequest;
  data: bookAutherUpdateBodySchemaType;
  id: number;
};

type bookAutherDeleteType = {
  request?: FastifyRequest;
  id: number;
};

interface BookAutherService {
  findAll(data: bookAutherFindAllType): Promise<bookAutherListResponseSchemaType>;
  create: (data: bookAutherCreateType) => Promise<bookAutherResponseSchemaType>;
  findOne: (data: bookAutherFindOneType) => Promise<bookAutherResponseSchemaType | null>;
  update: (data: bookAutherUpdateType) => Promise<bookAutherResponseSchemaType>;
  remove: (data: bookAutherDeleteType) => Promise<messageResponseSchemaType>;
  count: (data: Partial<bookAutherFindAllType>) => Promise<number>;
}

export default fp(async (fastify) => {
  const {
    prisma,
    // httpErrors
  } = fastify;

  const bookAutherService: BookAutherService = {
    findAll: async ({ skip, take, filter, request }) => {
      //TODO: implement your logic here
      const response = await fastify.petStoreClient.getPetByPetId(1);

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
      return { message: fastify.t("bookAuthers.messages.deleted") };
    },
    count: async ({ filter }) => {
      return await prisma.$transaction(async (prisma) => {
        //TODO: implement your logic here
        return 0;
      });
    },
  };

  fastify.decorate("bookAutherService", bookAutherService);
});

declare module "fastify" {
  interface FastifyInstance {
    bookAutherService: BookAutherService;
  }
}
