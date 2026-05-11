import { prisma } from "../utils/prisma";
import { redis } from "../utils/redis";

export const getMembershipService = async (userId: string) => {
  const cacheTtl = Number(process.env.CACHE_TTL) || 600;
  const cacheKey = `membership:${userId}`;

  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }
  const membership = await prisma.membership.findFirst({
    where: {
      userId,
    },
    orderBy: {
      joinedAt: "desc",
    },
  });

  if (!membership) {
    throw new Error("Membership not found");
  }

  await redis.set(cacheKey, JSON.stringify(membership), "EX", cacheTtl);

  return membership;
};

export const createMembershipService = async (userId: string) => {
  const existing = await prisma.membership.findFirst({
    where: { userId },
  });
  if (existing) {
    throw new Error("Membership already exists");
  }
  const membershipCode = `MEM-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  return prisma.membership.create({
    data: {
      userId,
      membershipCode,
      level: "BRONZE",
      points: 0,
      lifetimePoints: 0,
      joinedAt: new Date(),
      expiredAt: null,
    },
  });
};

export const updateMembershipService = async (
  userId: string,
  data: {
    level?: "BRONZE" | "SILVER" | "GOLD" | "PLATINUM";
    points?: number;
    lifetimePoints?: number;
  },
) => {
  const existing = await prisma.membership.findFirst({
    where: { userId },
    orderBy: {
      joinedAt: "desc",
    },
  });

  if (!existing) {
    throw new Error("Membership not found");
  }

  const membership = await prisma.membership.update({
    where: { id: existing.id },
    data,
  });

  await redis.del(`membership:${userId}`);

  return membership;
};

export const deleteMembershipService = async (userId: string) => {
  const existing = await prisma.membership.findFirst({
    where: { userId },
    orderBy: {
      joinedAt: "desc",
    },
  });

  if (!existing) {
    throw new Error("Membership not found");
  }

  await prisma.membership.delete({
    where: { id: existing.id },
  });

  await redis.del(`membership:${userId}`);
};
