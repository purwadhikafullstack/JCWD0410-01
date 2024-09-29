import prisma from '../../prisma';

export const getAddressesService = async (userId: number) => {
  const address = await prisma.address.findMany({
    where: { userId, isDeleted: false },
  });

  return address;
};
