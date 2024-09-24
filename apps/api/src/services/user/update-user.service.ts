import { cloudinaryUpload } from '@/lib/cloudinary';
import prisma from '@/prisma';
import { User } from '@prisma/client';

export const updateProfileService = async (
  userId: number,
  body: Partial<User>,
  file?: Express.Multer.File,
) => {
  delete body.profilePicture;

  try {
    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
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

    return {
      message: 'Update profile success',
      data: profileUpdate,
    };
  } catch (error) {
    throw error;
  }
};
