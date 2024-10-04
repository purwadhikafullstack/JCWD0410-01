import prisma from '@/prisma';

export const deleteAddressService = async (
  userId: number,
  addressId: number,
) => {
  try {
    const address = await prisma.address.findFirst({
      where: { id: addressId, userId },
    });

    if (!address) {
      throw new Error('Address not found');
    }

    await prisma.address.update({
      where: { id: addressId, userId },
      data: {
        isDeleted: true,
      },
    });

    return {
      message: 'Delete Address Success',
    };
  } catch (error) {
    throw error;
  }
};
