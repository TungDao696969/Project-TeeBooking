"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadAvatarService = exports.updateUserProfileService = exports.getUserProfileService = void 0;
const prisma_1 = require("../utils/prisma");
const cloudinary_1 = __importDefault(require("../configs/cloudinary"));
const streamifier_1 = __importDefault(require("streamifier"));
const getUserProfileService = async (userId) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
            avatarUrl: true,
            gender: true,
            dateOfBirth: true,
            role: true,
            isVerified: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    if (!user) {
        throw new Error("User not found");
    }
    return user;
};
exports.getUserProfileService = getUserProfileService;
const updateUserProfileService = async (userId, data) => {
    // kiểm tra user có tồn tại
    const existingUser = await prisma_1.prisma.user.findUnique({
        where: { id: userId },
    });
    if (!existingUser) {
        throw new Error("User not found");
    }
    // Nếu đổi phone thì check trùng
    if (data.phone && data.phone !== existingUser.phone) {
        const phoneExists = await prisma_1.prisma.user.findUnique({
            where: { phone: data.phone },
        });
        if (phoneExists) {
            throw new Error("Phone already exists");
        }
    }
    const updateUser = await prisma_1.prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            fullName: data.fullName,
            phone: data.phone,
            avatarUrl: data.avatarUrl,
            gender: data.gender,
            dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
        },
        select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
            avatarUrl: true,
            gender: true,
            dateOfBirth: true,
            role: true,
            isVerified: true,
            isActive: true,
            updatedAt: true,
        },
    });
    return updateUser;
};
exports.updateUserProfileService = updateUserProfileService;
const uploadAvatarService = async (userId, file) => {
    const existingUser = await prisma_1.prisma.user.findUnique({
        where: { id: userId },
    });
    if (!existingUser) {
        throw new Error("User not found");
    }
    const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary_1.default.uploader.upload_stream({
            folder: "booking/users/avatars",
            public_id: `avatar-${userId}`,
            overwrite: true,
            resource_type: "image",
        }, (error, result) => {
            if (error)
                return reject(error);
            resolve(result);
        });
        streamifier_1.default.createReadStream(file.buffer).pipe(stream);
    });
    const updatedUser = await prisma_1.prisma.user.update({
        where: { id: userId },
        data: {
            avatarUrl: uploadResult.secure_url,
        },
        select: {
            id: true,
            fullName: true,
            email: true,
            avatarUrl: true,
            updatedAt: true,
        },
    });
    return updatedUser;
};
exports.uploadAvatarService = uploadAvatarService;
//# sourceMappingURL=user.service.js.map