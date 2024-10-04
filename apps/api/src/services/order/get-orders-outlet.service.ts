import prisma from '@/prisma';
import { OrderStatus, Prisma } from '@prisma/client';

interface GetOrdersOutletInterface {
  page: number;
  take: number;
  sortBy: string;
  sortOrder: string;
  search: string;
  status: OrderStatus | "";
  outletId: number;
}

export const getOrdersOutletService = async (
  query: GetOrdersOutletInterface,
  userId: number,
) => {
  try {
    const { page, take, sortBy, sortOrder, search, status } = query;

    const user = await prisma.user.findFirst({
      where: { id: userId },
      include: {employee: {select: {outletId: true}}}
    });

    if (!user) {
      throw new Error('User does not exist');
    }

    let whereClause: Prisma.OrderWhereInput = {
      isDeleted: false,
      outletId: user.employee?.outletId
    };

    if (status) {
      whereClause.orderStatus = status;
    }

    if (search) {
      whereClause.orderNumber = { contains: search };
    }

    const orders = await prisma.order.findMany({
      where: whereClause,
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
      whereClause,
    };
  } catch (error) {
    throw error;
  }
};
