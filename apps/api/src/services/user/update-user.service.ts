import { JWT_SECRET } from '@/config';
import { cloudinaryUpload } from '@/lib/cloudinary';
import prisma from '@/prisma';
import { User } from '@prisma/client';
import { sign } from 'jsonwebtoken';

export const updateProfileService = async (
  userId: number,
  body: Partial<User>,
  file?: Express.Multer.File,
) => {
  try {
    const user = await prisma.user.findFirst({
      where: { id: userId, isDeleted: false },
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (body.phoneNumber) {
      const existingPhoneNumber = await prisma.user.findFirst({
        where: {
          phoneNumber: body.phoneNumber,
        },
      });

      if (existingPhoneNumber) {
        throw new Error('This phone number is already in use.');
      }
    }

    if (file) {
      const { secure_url } = await cloudinaryUpload(file);
      body.profilePicture = secure_url;
    }

    const profileUpdate = await prisma.user.update({
      where: { id: userId },
      data: {
        ...body,
      },
    });

    const token = sign({ id: user.id }, JWT_SECRET!, {
      expiresIn: '2h',
    });

    return {
      message: 'Update profile success',
      data: { ...profileUpdate, token },
    };
  } catch (error) {
    throw error;
  }
};
