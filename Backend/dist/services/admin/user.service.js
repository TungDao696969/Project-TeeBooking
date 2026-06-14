"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restoreUserService = exports.getTrashUsersService = exports.deleteUserService = exports.updateUserService = exports.getUserByIdService = exports.getUsersService = exports.createUserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../../utils/prisma");
const redis_1 = require("../../utils/redis");
const createUserService = async (data) => {
    const existingUser = await prisma_1.prisma.user.findFirst({
        where: {
            OR: [{ email: data.email }, { phone: data.phone }],
        },
    });
    if (existingUser) {
        throw new Error("Email or phone already exists");
    }
    const passwordHash = await bcrypt_1.default.hash(data.password, 10);
    const user = await prisma_1.prisma.user.create({
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
    const userListKeys = await redis_1.redis.keys("users:*");
    if (userListKeys.length > 0) {
        await redis_1.redis.del(...userListKeys);
    }
    return user;
};
exports.createUserService = createUserService;
const getUsersService = async ({ page = 1, limit = 10, search = "", }) => {
    const cacheKey = `users:${page}:${limit}:${search}`;
    const cached = await redis_1.redis.get(cacheKey);
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
                    mode: "insensitive",
                },
            },
            {
                email: {
                    contains: search,
                    mode: "insensitive",
                },
            },
            {
                phone: {
                    contains: search,
                    mode: "insensitive",
                },
            },
        ],
    };
    const [users, total] = await prisma_1.prisma.$transaction([
        prisma_1.prisma.user.findMany({
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
        prisma_1.prisma.user.count({
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
    await redis_1.redis.set(cacheKey, JSON.stringify(result), "EX", 60);
    return result;
};
exports.getUsersService = getUsersService;
const getUserByIdService = async (id) => {
    const cacheKey = `user:${id}`;
    const cached = await redis_1.redis.get(cacheKey);
    if (cached) {
        return JSON.parse(cached);
    }
    const user = await prisma_1.prisma.user.findUnique({
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
    await redis_1.redis.set(cacheKey, JSON.stringify(user), "EX", 60);
    return user;
};
exports.getUserByIdService = getUserByIdService;
const updateUserService = async (id, data) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: { id },
    });
    if (!user) {
        throw new Error("User not found");
    }
    const updatedUser = await prisma_1.prisma.user.update({
        where: { id },
        data: {
            fullName: data.fullName,
            phone: data.phone,
            role: data.role,
            isActive: data.isActive,
            isVerified: data.isVerified,
        },
    });
    const userListKeys = await redis_1.redis.keys("users:*");
    if (userListKeys.length > 0) {
        await redis_1.redis.del(...userListKeys);
    }
    await redis_1.redis.del(`user:${id}`);
    return updatedUser;
};
exports.updateUserService = updateUserService;
const deleteUserService = async (id) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: { id },
    });
    if (!user) {
        throw new Error("User not found");
    }
    await prisma_1.prisma.user.update({
        where: { id },
        data: {
            deletedAt: new Date(),
            isActive: false,
        },
    });
    const userListKeys = await redis_1.redis.keys("users:*");
    if (userListKeys.length > 0) {
        await redis_1.redis.del(...userListKeys);
    }
    await redis_1.redis.del("users:trash");
    await redis_1.redis.del(`user:${id}`);
};
exports.deleteUserService = deleteUserService;
const getTrashUsersService = async () => {
    const cacheKey = "users:trash";
    const cachedData = await redis_1.redis.get(cacheKey);
    if (cachedData) {
        return JSON.parse(cachedData);
    }
    const users = await prisma_1.prisma.user.findMany({
        where: {
            deletedAt: {
                not: null,
            },
        },
        orderBy: {
            deletedAt: "desc",
        },
    });
    await redis_1.redis.set(cacheKey, JSON.stringify(users), "EX", 300);
    return users;
};
exports.getTrashUsersService = getTrashUsersService;
const restoreUserService = async (id) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: { id },
    });
    if (!user) {
        throw new Error("User not found");
    }
    const restoredUser = await prisma_1.prisma.user.update({
        where: { id },
        data: {
            deletedAt: null,
            isActive: true,
        },
    });
    // clear cache user detail
    await redis_1.redis.del(`user:${id}`);
    // clear trash cache
    await redis_1.redis.del("users:trash");
    // clear all user list cache
    const userListKeys = await redis_1.redis.keys("users:*");
    if (userListKeys.length > 0) {
        await redis_1.redis.del(...userListKeys);
    }
    return restoredUser;
};
exports.restoreUserService = restoreUserService;
//# sourceMappingURL=user.service.js.map