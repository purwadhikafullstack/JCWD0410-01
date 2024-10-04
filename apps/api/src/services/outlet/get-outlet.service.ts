import prisma from '@/prisma';

export const getOutletService = async (outletId: number) => {
  const outlet = await prisma.outlet.findFirst({
    where: { id: outletId, isDeleted: false },
  });

  if (!outlet) {
    throw new Error('Outlet not found');
  }

  return outlet;
};
