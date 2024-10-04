import prisma from '@/prisma';
import { Prisma } from '@prisma/client';

interface GetLaundryItemsService {
  page: number;
  take: number;
  sortBy: string;
  sortOrder: string;
}

export const getLaundryItemsService = async (query: GetLaundryItemsService) => {
  try {
    const { page, take, sortBy, sortOrder } = query;

    const whereClause: Prisma.LaundryItemWhereInput = {
      isDeleted: false,
    };

    const laundryItems = await prisma.laundryItem.findMany({
      where: whereClause,
      take: take,
      skip: (page - 1) * take,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    const total = await prisma.laundryItem.count({
      where: whereClause,
    });

    return {
      data: laundryItems,
      meta: { total, take, page },
    };
  } catch (error) {
    throw error;
  }
};
