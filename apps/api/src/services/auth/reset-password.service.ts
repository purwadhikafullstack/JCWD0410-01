import { hashPassword } from '@/lib/bcrypt';
import prisma from '@/prisma';

export const resetPasswordService = async (
  userId: number,
  password: string,
) => {
  try {
    const user = await prisma.user.findFirst({
      where: { id: userId, provider: 'CREDENTIALS' },
    });

    if (!user) {
      throw new Error('Account not found');
    }

    if (user.isPasswordReset) {
      throw new Error('This password reset token has already been used.');
    }

    const hashedPassword = await hashPassword(password);

    await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
        isPasswordReset: true,
      },
    });
    return {
      message: 'Reset password success',
    };
  } catch (error) {
    throw error;
  }
};
