import { prisma } from "../utils/prisma";
import { UpdateProfileInput } from "../validations/user.schema";
import cloudinary from "../configs/cloudinary";
import streamifier from "streamifier";

export const getUserProfileService = async (userId: string) => {
  const user = await prisma.user.findUnique({
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

export const updateUserProfileService = async (
  userId: string,
  data: UpdateProfileInput,
) => {
  // kiểm tra user có tồn tại
  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!existingUser) {
    throw new Error("User not found");
  }

  // Nếu đổi phone thì check trùng
  if (data.phone && data.phone !== existingUser.phone) {
    const phoneExists = await prisma.user.findUnique({
      where: { phone: data.phone },
    });

    if (phoneExists) {
      throw new Error("Phone already exists");
    }
  }

  const updateUser = await prisma.user.update({
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

export const uploadAvatarService = async (
  userId: string,
  file: Express.Multer.File,
) => {
  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!existingUser) {
    throw new Error("User not found");
  }

  const uploadResult = await new Promise<any>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "booking/users/avatars",
        public_id: `avatar-${userId}`,
        overwrite: true,
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });

  const updatedUser = await prisma.user.update({
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
