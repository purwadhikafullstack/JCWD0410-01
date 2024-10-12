import prisma from '@/prisma';
import { OrderStatus, Prisma } from '@prisma/client';

interface GetOrdersUserInterface {
  page: number;
  take: number;
  sortBy: string;
  sortOrder: string;
  search: string;
  status: OrderStatus | 'ALL';
  isPaid: string;
}

export const getOrdersUserService = async (
  query: GetOrdersUserInterface,
  userId: number,
) => {
  try {
    const { page, take, sortBy, sortOrder, search, status, isPaid } = query;

    const user = await prisma.user.findFirst({
      where: { id: userId, isDeleted: false },
    });

    if (!user) {
      throw new Error('User does not exist');
    }

    let whereClause: Prisma.OrderWhereInput = {
      userId,
      isDeleted: false,
    };

    if (status === 'ALL') {
      whereClause.orderStatus = undefined;
    } else if (status) {
      whereClause.orderStatus = status;
    }

    if (isPaid) {
      whereClause.isPaid = true;
    }

    if (search) {
      whereClause.orderNumber = { contains: search };
    }

    const orders = await prisma.order.findMany({
      where: whereClause,
      include: {outlet: {select: {name: true}}},
      take: take,
      skip: (page - 1) * take,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    const total = await prisma.order.count({
      where: whereClause,
    });

    return {
      data: orders,
      meta: { total, take, page },
    };
  } catch (error) {
    throw error;
  }
};
