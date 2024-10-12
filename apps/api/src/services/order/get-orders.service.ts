import prisma from '@/prisma';
import { OrderStatus, Prisma } from '@prisma/client';

interface GetOrdersInterface {
  page: number;
  take: number;
  sortBy: string;
  sortOrder: string;
  search: string;
  status: OrderStatus | 'ALL';
  outletId: number;
}

export const getOrdersService = async (
  query: GetOrdersInterface,
  userId: number,
) => {
  try {
    const { page, take, sortBy, sortOrder, search, status, outletId } = query;

    const user = await prisma.user.findFirst({
      where: { id: userId, isDeleted: false },
      include: { employee: { select: { outletId: true } } },
    });

    if (!user) {
      throw new Error('User does not exist');
    }

    if (!user.employee) {
      throw new Error('Employee does not exist');
    }

    let whereClause: Prisma.OrderWhereInput = {
      isDeleted: false,
    };

    if (status === 'ALL') {
      whereClause.orderStatus = undefined;
    } else if (status) {
      whereClause.orderStatus = status;
    }

    if (outletId) {
      whereClause.outletId = outletId;
    }

    if (user.role === 'OUTLET_ADMIN') {
      whereClause.outletId = user.employee.outletId;
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
      whereClause,
    };
  } catch (error) {
    throw error;
  }
};
