import bcrypt from "bcrypt";

import { prisma } from "../../utils/prisma";

import { redis } from "../../utils/redis";

import { CreateUserInput } from "../../validations/user.validation";
interface GetUsersOptions {
  page?: number;

  limit?: number;

  search?: string;
}
export const createUserService = async (data: CreateUserInput) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email: data.email }, { phone: data.phone }],
    },
  });

  if (existingUser) {
    throw new Error("Email or phone already exists");
  }

  const passwordHash = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      fullName: data.fullName,

      email: data.email,

      phone: data.phone,

      passwordHash,

      role: data.role || "customer",
    },

    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      role: true,
      createdAt: true,
    },
  });

  const userListKeys = await redis.keys("users:*");

  if (userListKeys.length > 0) {
    await redis.del(...userListKeys);
  }

  return user;
};

export const getUsersService = async ({
  page = 1,

  limit = 10,

  search = "",
}: GetUsersOptions) => {
  const cacheKey = `users:${page}:${limit}:${search}`;

  const cached = await redis.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  const skip = (page - 1) * limit;

  const whereClause = {
    deletedAt: null,

    OR: [
      {
        fullName: {
          contains: search,
          mode: "insensitive" as const,
        },
      },

      {
        email: {
          contains: search,
          mode: "insensitive" as const,
        },
      },

      {
        phone: {
          contains: search,
          mode: "insensitive" as const,
        },
      },
    ],
  };

  const [users, total] = await prisma.$transaction([
    prisma.user.findMany({
      where: whereClause,

      skip,

      take: limit,

      orderBy: {
        createdAt: "desc",
      },

      select: {
        id: true,

        fullName: true,

        email: true,

        phone: true,

        avatarUrl: true,

        role: true,

        isActive: true,

        isVerified: true,

        createdAt: true,
      },
    }),

    prisma.user.count({
      where: whereClause,
    }),
  ]);

  const result = {
    users,

    pagination: {
      page,

      limit,

      total,

      totalPages: Math.ceil(total / limit),
    },
  };

  await redis.set(cacheKey, JSON.stringify(result), "EX", 60);

  return result;
};

export const getUserByIdService = async (id: string) => {
  const cacheKey = `user:${id}`;

  const cached = await redis.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  const user = await prisma.user.findUnique({
    where: {
      id,
    },

    include: {
      bookings: true,

      memberships: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  await redis.set(cacheKey, JSON.stringify(user), "EX", 60);

  return user;
};

export const updateUserService = async (
  id: string,
  data: Partial<CreateUserInput & { isActive?: boolean; isVerified?: boolean }>,
) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const updatedUser = await prisma.user.update({
    where: { id },

    data: {
      fullName: data.fullName,
      phone: data.phone,
      role: data.role,
      isActive: data.isActive,
      isVerified: data.isVerified,
    },
  });

  const userListKeys = await redis.keys("users:*");

  if (userListKeys.length > 0) {
    await redis.del(...userListKeys);
  }

  await redis.del(`user:${id}`);

  return updatedUser;
};

export const deleteUserService = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error("User not found");
  }

  await prisma.user.update({
    where: { id },

    data: {
      deletedAt: new Date(),

      isActive: false,
    },
  });

  const userListKeys = await redis.keys("users:*");

  if (userListKeys.length > 0) {
    await redis.del(...userListKeys);
  }

  await redis.del(`user:${id}`);
};
