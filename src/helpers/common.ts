import { FastifyReply } from "fastify";
import bcrypt from "bcrypt";

type paginationHeaderType = {
  reply: FastifyReply;
  totalRecords: number;
  page: number;
  take: number;
};

export const setPaginationHeaders = async ({ reply, totalRecords, page, take }: paginationHeaderType) => {
  const totalPages = Math.ceil(totalRecords / take);
  reply.header("x-total-count", totalRecords);
  reply.header("x-total-pages", totalPages);
  reply.header("x-current-page", page);
};

// calculate the next hour
export const nextOfHour = (hour: number) => {
  const now = new Date();
  const next = new Date();
  next.setHours(now.getHours() - (now.getHours() % hour) + hour);
  next.setMinutes(0);
  next.setSeconds(0);
  next.setMilliseconds(0);
  return (next.getTime() - now.getTime()) as number;
};

// calculate the next minute
export const nextOfMinute = (minute: number) => {
  const now = new Date();
  const next = new Date();
  next.setHours(now.getHours());
  next.setMinutes(now.getMinutes() - (now.getMinutes() % minute) + minute);
  next.setSeconds(0);
  next.setMilliseconds(0);
  return (next.getTime() - now.getTime()) as number;
};

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
