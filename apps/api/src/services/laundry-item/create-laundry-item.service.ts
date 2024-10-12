import prisma from '@/prisma';

interface CreateLaundryItemBody {
  name: string;
}

export const createLaundryItemsService = async (
  body: CreateLaundryItemBody,
) => {
  try {
    const { name } = body;

    const existingItem = await prisma.laundryItem.findFirst({
      where: { name, isDeleted: false },
    });

    if (existingItem) {
      throw new Error('Item already exist');
    }

    const deletedItem = await prisma.laundryItem.findFirst({
      where: { name, isDeleted: true },
    });

    if (deletedItem) {
      await prisma.laundryItem.update({
        where: { id: deletedItem.id },
        data: { isDeleted: false },
      });
    } else {
      const newItem = await prisma.laundryItem.create({
        data: {
          name,
        },
      });
    }

    return { message: 'Create laundry item success' };
  } catch (error) {
    throw error;
  }
};
