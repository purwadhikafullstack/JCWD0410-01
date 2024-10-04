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
      where: { name },
    });

    if (existingItem) {
      throw new Error('Item already exist');
    }

    const newItem = await prisma.laundryItem.create({
      data: {
        name,
      },
    });

    return newItem;
  } catch (error) {
    throw error;
  }
};
