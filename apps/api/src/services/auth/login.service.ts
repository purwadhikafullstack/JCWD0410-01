import { JWT_SECRET } from '@/config';
import { comparePassword } from '@/lib/bcrypt';
import prisma from '@/prisma';
import { User } from '@prisma/client';
import { sign } from 'jsonwebtoken';

export const loginService = async (body: Pick<User, 'email' | 'password'>) => {
  try {
    const { email, password } = body;

    //mencari email di db
    const user = await prisma.user.findFirst({
      //koma maksudnya dan(&)
      where: { email, provider: 'CREDENTIALS' },
    });

    if (!user) {
      throw new Error('Invalid email address');
    }

    const isPasswordValid = await comparePassword(password!, user.password!);
    if (!isPasswordValid) {
      throw new Error('Incorrect password');
    }

    const token = sign({ id: user.id }, JWT_SECRET!, {
      expiresIn: '2h',
    });

    //ngeluarin password
    const { password: pass, ...userWithourPassword } = user;

    return { ...userWithourPassword, token };
  } catch (error) {
    throw error;
  }
};
