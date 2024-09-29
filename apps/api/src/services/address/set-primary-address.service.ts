import prisma from '@/prisma';

export const setPrimaryAddressService = async (
  userId: number,
  addressId: number,
) => {
  return await prisma.$transaction(async (prisma) => {
    await prisma.address.updateMany({
      where: {
        userId,
        isPrimary: true,
      },
      data: {
        isPrimary: false,
      },
    });

    await prisma.address.update({
      where: { id: addressId, userId },
      data: {
        isPrimary: true,
      },
    });
  });
};
