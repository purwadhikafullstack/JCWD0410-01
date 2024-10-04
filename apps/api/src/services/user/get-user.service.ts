import prisma from '../../prisma';

export const getUserService = async (id: number) => {
  const user = await prisma.user.findFirst({
    where: { id },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};
