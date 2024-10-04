import prisma from '@/prisma';

export const getLaundryItemService = async (laundryItemId: number) => {
  const item = await prisma.laundryItem.findFirst({
    where: { id: laundryItemId },
  });

  if (!item) {
    throw new Error('Laundry item not found');
  }

  return item;
};
