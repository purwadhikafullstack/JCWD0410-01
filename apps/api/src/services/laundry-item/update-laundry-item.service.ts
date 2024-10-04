import prisma from '@/prisma';

interface UpdateLaundryItemsBody {
  name: string;
}

export const updateLaundryItemsService = async (
  body: UpdateLaundryItemsBody,
  laundryItemId: number,
) => {
  try {
    const { name } = body;

    const existingItem = await prisma.laundryItem.findFirst({
      where: { id: laundryItemId },
    });

    if (!existingItem) {
      throw new Error('Laundry item not found');
    }

    await prisma.laundryItem.update({
      where: { id: laundryItemId },
      data: {
        name,
      },
    });

    return {
      message: 'Update Laundry Item Success',
    };
  } catch (error) {
    throw error;
  }
};
