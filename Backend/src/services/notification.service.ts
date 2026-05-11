import { prisma } from "../utils/prisma";
import { redis } from "../utils/redis";
import { UpdateAddressInput } from "../validations/address.schema";
import {
  CreateNotificationInput,
  UpdateNotificationInput,
} from "../validations/notification.validation";

const cacheTtl = Number(process.env.CACHE_TTL);

export const createNotificationService = async (
  userId: string,
  data: CreateNotificationInput,
) => {
  const notification = await prisma.notification.create({
    data: {
      userId,
      ...data,
    },
  });

  await redis.del(`notification: ${userId}`);

  return notification;
};

export const getAllNotificationService = async (userId: string) => {
  const cacheKey = `notification:${cacheTtl}`;

  const cached = await redis.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  const notification = await prisma.notification.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  await redis.set(cacheKey, JSON.stringify(notification), "EX", cacheTtl);

  return notification;
};

export const getNotificationByIdService = async (
  userId: string,
  id: string,
) => {
  const notification = await prisma.notification.findFirst({
    where: {
      id,
      userId,
    },
  });
  return notification;
};

export const updateNotificationService = async (
  userId: string,
  id: string,
  data: UpdateNotificationInput,
) => {
  const notification = await prisma.notification.update({
    where: { id },
    data,
  });

  await redis.del(`notifications:${userId}`);

  return notification;
};

export const deleteNotificationService = async (userId: string, id: string) => {
  await prisma.notification.delete({
    where: { id },
  });

  await redis.del(`notifications:${userId}`);

  return true;
};

export const markAsReadService = async (userId: string, id: string) => {
  const notification = await prisma.notification.update({
    where: { id },
    data: {
      isRead: true,
    },
  });

  await redis.del(`notifications:${userId}`);

  return notification;
};
