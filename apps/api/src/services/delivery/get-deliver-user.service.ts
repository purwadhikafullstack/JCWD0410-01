import prisma from '@/prisma';
import { Prisma, Role, User } from '@prisma/client';

interface GetDeliveryInterface {
  page: number;
  take: number;
  sortBy: string;
  sortOrder: string;
  search: string;
  status: 'ONGOING' | 'HISTORY' | 'ALL';
}

export const getDeliveryUserService = async (
  query: GetDeliveryInterface,
  userId: number,
) => {
  try {
    const { page, take, sortBy, sortOrder, search, status } = query;

    const user = await prisma.user.findFirst({
      where: { id: userId, isDeleted: false },
    });

    if (!user) {
      throw new Error('User not found');
    }

    let whereClause: Prisma.Delivery_OrderWhereInput = {
      userId,
      isDeleted: false,
    };

    if (status === 'ONGOING') {
      whereClause.AND = [
        { NOT: { status: 'RECEIVED_BY_CUSTOMER' } },
        { NOT: { status: 'ONSITE' } },
      ];
    }

    if (status === 'HISTORY') {
      whereClause.OR = [{ status: 'RECEIVED_BY_CUSTOMER' }, { status: 'ONSITE' }];
    }

    if (search) {
      whereClause.deliveryNumber = { contains: search };
    }

    const deliveryOrders = await prisma.delivery_Order.findMany({
      where: whereClause,
      include: {
        employee: { select: { user: { select: { phoneNumber: true, name: true } } } },
        address: { select: { address: true, latitude: true, longitude: true } },
        outlet: { select: { name: true, address: true, latitude: true, longitude: true } },
      },
      take: take,
      skip: (page - 1) * take,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    const total = await prisma.delivery_Order.count({
      where: whereClause,
    });

    return {
      data: deliveryOrders,
      meta: { total, take, page },
    };
  } catch (error) {
    throw error;
  }
};
