import prisma from '@/prisma';
import { Prisma, Role, User } from '@prisma/client';

interface GetPickupRequestInterface {
  page: number;
  take: number;
  sortBy: string;
  sortOrder: string;
  search: string;
}

export const getPickupRequestService = async (
  query: GetPickupRequestInterface,
  employeeId: number,
) => {
  try {
    const { page, take, sortBy, sortOrder, search } = query;

    const whereClause: Prisma.Pickup_OrderWhereInput = {
      isDeleted: false,
      status: 'WAITING_FOR_DRIVER',
    };

    // if (search) {
    //   whereClause.pickupNumber = { contains: search };
    // }

    const pickupOrders = await prisma.pickup_Order.findMany({
      where: whereClause,
      include: {
        address: { select: { address: true, latitude: true, longitude: true } },
        outlet: { select: { name: true, latitude: true, longitude: true } },
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

    // const usersWithoutPassword = deliveryOrders.filter((deliveryOrder) => {
    //   const { password, ...userWithoutPassword } = user;
    //   return userWithoutPassword;
    // });

    return {
      data: pickupOrders,
      meta: { total, take, page },
    };
  } catch (error) {
    throw error;
  }
};
