"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserService = void 0;
const hash_1 = require("../utils/hash");
const jwt_1 = require("../utils/jwt");
const prisma_1 = require("../utils/prisma");
const registerUserService = async (data) => {
    const existingUser = await prisma_1.prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });
    if (existingUser) {
        throw new Error("Email already exists");
    }
    const hashedPassword = await (0, hash_1.hashPassword)(data.password);
    const newUser = await prisma_1.prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            passwordHash: hashedPassword,
            phone: data.phone,
            country: data.country,
            language: data.language,
            role: "customer",
            isVerified: false,
        },
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            country: true,
            language: true,
            role: true,
            createdAt: true,
        },
    });
    const token = (0, jwt_1.generateAccessToken)(newUser.id);
    return {
        user: newUser,
        token,
    };
};
exports.registerUserService = registerUserService;
//# sourceMappingURL=auth.service.js.map