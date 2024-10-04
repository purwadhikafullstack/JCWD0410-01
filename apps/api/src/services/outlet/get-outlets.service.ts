import prisma from '@/prisma';
import { Prisma } from '@prisma/client';

interface GetOutletsService {
  page: number;
  take: number;
  sortBy: string;
  sortOrder: string;
  search: string;
}

export const getOutletsService = async (query: GetOutletsService) => {
  try {
    const { page, take, sortBy, sortOrder, search } = query;

    const whereClause: Prisma.OutletWhereInput = {
      isDeleted: false,
    };

    if (search) {
      whereClause.name = { contains: search };
    }

    const outlets = await prisma.outlet.findMany({
      where: whereClause,
      take: take,
      skip: (page - 1) * take,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    const total = await prisma.outlet.count({
      where: whereClause,
    });

    return {
      data: outlets,
      meta: { total, take, page },
    };
  } catch (error) {
    throw error;
  }
};
