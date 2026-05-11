import { prisma } from "../utils/prisma";
import { redis } from "../utils/redis";
const CACHE_TTL = 300;

export const createActivityLogService = async (data: {
  userId: string;
  action: string;
  targetType: string;
  targetId?: string;
  ipAddress?: string;
  userAgent?: string;
}) => {
  const log = await prisma.activityLog.create({
    data,
  });

  await redis.del(`activity_logs:${data.userId}`);

  return log;
};

export const getUserActivityLogsService = async (userId: string) => {
  const cacheKey = `activity_logs:${userId}`;

  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const logs = await prisma.activityLog.findMany({
    where: { userId },
    orderBy: {
      createdAt: "desc",
    },
  });

  await redis.set(cacheKey, JSON.stringify(logs), "EX", CACHE_TTL);

  return logs;
};

export const getActivityLogByIdService = async (id: string, userId: string) => {
  const log = await prisma.activityLog.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!log) {
    throw new Error("Activity log not found");
  }

  return log;
};

export const deleteActivityLogService = async (id: string, userId: string) => {
  const deleted = await prisma.activityLog.deleteMany({
    where: {
      id,
      userId,
    },
  });

  if (!deleted.count) {
    throw new Error("Activity log not found");
  }

  await redis.del(`activity_logs:${userId}`);
};

export const clearUserActivityLogsService = async (userId: string) => {
  await prisma.activityLog.deleteMany({
    where: { userId },
  });

  await redis.del(`activity_logs:${userId}`);
};
