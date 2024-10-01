import prisma from '../../prisma';

export const getOutletService = async () => {
  const outlet = await prisma.outlet.findMany({
    where: { isDeleted: false },
  });

  return outlet;
};
