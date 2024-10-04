import prisma from '../../prisma';

export const getUserAdminService = async (id: number) => {
  const user = await prisma.user.findFirst({
    where: { id },
    include: {
      employee: {
        include: {
          employeeStations: { include: { station: true } },
          outlet: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};
