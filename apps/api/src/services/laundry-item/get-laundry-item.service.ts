import prisma from '@/prisma';

export const getLaundryItemService = async (laundryItemId: number) => {
  try {
    const item = await prisma.laundryItem.findFirst({
      where: { id: laundryItemId, isDeleted: false },
    });

    if (!item) {
      throw new Error('Laundry item not found');
    }

    return item;
  } catch (error) {
    throw error;
  }
};
