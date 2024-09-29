import prisma from '../../prisma';

export const getAddressService = async (userId: number, addressId: number) => {
  const address = await prisma.address.findFirst({
    where: { id: addressId, userId },
  });

  if (!address) {
    throw new Error('Address not found');
  }

  return address;
};
