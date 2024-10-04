import prisma from '@/prisma';

export const deleteOutletService = async (outletId: number) => {
  try {
    const outlet = await prisma.outlet.findFirst({
      where: { id: outletId },
    });

    if (!outlet) {
      throw new Error('outlet not found');
    }

    await prisma.outlet.update({
      where: { id: outletId },
      data: {
        isDeleted: true,
      },
    });

    return {
      message: 'Delete outlet berhasil',
    };
  } catch (error) {
    throw error;
  }
};
