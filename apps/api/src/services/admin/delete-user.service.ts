import prisma from '@/prisma';

interface DeleteUserInterface {
  id: number;
}

export const deleteUserService = async (body: DeleteUserInterface) => {
  try {
    const { id } = body;

    const user = await prisma.user.findFirst({
      where: { id },
      include: {
        employee: { select: { id: true } },
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const employee = await prisma.employee.findFirst({
      where: { id: user.employee?.id },
    });

    return await prisma.$transaction(async (prisma) => {
      await prisma.user.update({
        where: { id },
        data: {
          isDeleted: true,
        },
      });

      if (employee) {
        await prisma.employee.update({
          where: { id: employee.id },
          data: {
            isDeleted: true,
          },
        });
      }

      return {
        message: 'Delete user berhasil',
      };
    });
  } catch (error) {
    throw error;
  }
};
