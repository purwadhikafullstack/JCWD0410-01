import { comparePassword, hashPassword } from '@/lib/bcrypt';
import prisma from '@/prisma';

export const updatePasswordService = async (
  userId: number,
  password: string,
  oldPassword: string,
) => {
  try {
    const user = await prisma.user.findFirst({
      where: { id: userId, isDeleted: false, role: 'CUSTOMER' },
    });

    if (!user) {
      throw new Error('Account not found');
    }

    const compare = await comparePassword(oldPassword, user.password!);

    if (!compare) {
      throw new Error('Incorrect old password');
    }

    const hashedPassword = await hashPassword(password);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return {
      message: 'Change password success',
    };
  } catch (error) {
    throw error;
  }
};
