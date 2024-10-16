import { JWT_SECRET } from '@/config';
import { comparePassword } from '@/lib/bcrypt';
import prisma from '@/prisma';
import { User } from '@prisma/client';
import { sign } from 'jsonwebtoken';

export const loginService = async (body: Pick<User, 'email' | 'password'>) => {
  try {
    const { email, password } = body;

    const user = await prisma.user.findFirst({
      where: { email, provider: 'CREDENTIALS' },
    });

    if (!user) {
      throw new Error('Invalid email address');
    }

    if (user.isDeleted) {
      throw new Error(
        'Account has been deleted, contact Master Admin if this was a mistake',
      );
    }

    const isPasswordValid = await comparePassword(password!, user.password!);
    if (!isPasswordValid) {
      throw new Error('Incorrect password');
    }

    const token = sign({ id: user.id, role: user.role }, JWT_SECRET!, {
      expiresIn: '2h',
    });

    const { password: pass, ...userWithourPassword } = user;

    return { ...userWithourPassword, token };
  } catch (error) {
    throw error;
  }
};
