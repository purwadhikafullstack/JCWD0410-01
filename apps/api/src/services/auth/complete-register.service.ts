import { hashPassword } from '@/lib/bcrypt';
import prisma from '@/prisma';

interface CompleteRegistrationProps {
  name: string;
  password: string;
}

export const completeRegistrationService = async (
  email: string,
  body: CompleteRegistrationProps,
  token: string,
) => {
  try {
    const { name, password } = body;

    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    if (existingUser && existingUser.isVerified === true) {
      throw new Error('User already exist');
    }

    if (token !== existingUser?.token) {
      throw new Error(
        'Invalid token. Please use the latest link we sent to your email.',
      );
    }

    const hashedPassword = await hashPassword(password!);

    const newUser = await prisma.user.update({
      where: { email },
      data: {
        name,
        password: hashedPassword,
        isVerified: true,
      },
    });

    return newUser;
  } catch (error) {
    throw error;
  }
};
