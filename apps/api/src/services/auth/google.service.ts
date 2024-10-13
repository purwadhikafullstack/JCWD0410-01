import { JWT_SECRET } from '@/config';
import { cloudinaryUpload } from '@/lib/cloudinary';
import { getUserInfo } from '@/lib/getUserInfo';
// import { transporter } from '@/libs/nodemailer';
import prisma from '@/prisma';
// import { appConfig } from '@/utils/config';
import { sign } from 'jsonwebtoken';

export const loginWithGoogleService = async (accessToken: string) => {
  try {
    const userInfo = await getUserInfo(accessToken);

    if (!userInfo) {
      return {
        status: 400,
        message: 'Failed to get user info from google',
      };
    }

    const user = await prisma.user.findFirst({
      where: { email: userInfo.email },
    });

    if (user && user.provider !== 'GOOGLE') {
      throw new Error('');
    }

    let newUser;

    if (!user) {
      newUser = await prisma.user.create({
        data: {
          email: userInfo.email,
          name: userInfo.name,
          isVerified: true,
          provider: 'GOOGLE',
          profilePicture: userInfo.picture,
        },
      });
    }

    const token = sign({ id: newUser?.id || user?.id }, JWT_SECRET!, {
      expiresIn: '2h',
    });

    return {
      message: `Hello ${userInfo.name}`,
      data: newUser || user,
      token,
    };
  } catch (error) {
    throw error;
  }
};
