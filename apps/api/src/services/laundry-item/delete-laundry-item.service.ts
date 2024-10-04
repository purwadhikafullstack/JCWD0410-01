import prisma from '@/prisma';

export const deleteLaundryItemService = async (laundryItemId: number) => {
  try {
    const item = await prisma.laundryItem.findFirst({
      where: { id: laundryItemId },
    });

    if (!item) {
      throw new Error('laundry item not found');
    }

    await prisma.laundryItem.update({
      where: { id: laundryItemId },
      data: {
        isDeleted: true,
      },
    });

    return {
      message: 'Delete item berhasil',
    };
  } catch (error) {
    throw error;
  }
};
