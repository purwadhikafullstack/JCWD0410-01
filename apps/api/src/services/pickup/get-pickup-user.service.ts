import prisma from '@/prisma';
import { Prisma, Role, User } from '@prisma/client';

interface GetPickupInterface {
  page: number;
  take: number;
  sortBy: string;
  sortOrder: string;
  search: string;
  status: 'ONGOING' | 'HISTORY' | 'ALL';
}

export const getPickupUserService = async (
  query: GetPickupInterface,
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

    let whereClause: Prisma.Pickup_OrderWhereInput = {
      userId,
      isDeleted: false,
    };

    if (status === 'ONGOING') {
      whereClause.AND = [
        { NOT: { status: 'RECEIVED_BY_OUTLET' } },
        { NOT: { status: 'ONSITE' } },
      ];
    }

    if (status === 'HISTORY') {
      whereClause.OR = [{ status: 'RECEIVED_BY_OUTLET' }, { status: 'ONSITE' }];
    }

    if (search) {
      whereClause.pickupNumber = { contains: search };
    }

    const pickupOrders = await prisma.pickup_Order.findMany({
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

    const total = await prisma.pickup_Order.count({
      where: whereClause,
    });

    return {
      data: pickupOrders,
      meta: { total, take, page },
    };
  } catch (error) {
    throw error;
  }
};
