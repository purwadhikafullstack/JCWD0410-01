import prisma from '@/prisma';
import { Prisma, Role, User } from '@prisma/client';

interface GetDeliveryDriverInterface {
  page: number;
  take: number;
  sortBy: string;
  sortOrder: string;
  search: string;
}

export const getDeliveryDriverService = async (
  query: GetDeliveryDriverInterface,
  employeeId: number,
) => {
  try {
    const { page, take, sortBy, sortOrder, search } = query;

    const whereClause: Prisma.Delivery_OrderWhereInput = {
      isDeleted: false,
      employeeId,
      OR: [{ status: 'ON_THE_WAY_TO_OUTLET' }, {status: 'ON_THE_WAY_TO_CUSTOMER' }],
    };

    if (search) {
      whereClause.deliveryNumber = { contains: search };
    }

    const deliveryOrders = await prisma.delivery_Order.findMany({
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

    const total = await prisma.delivery_Order.count({
      where: whereClause,
    });

    // const usersWithoutPassword = deliveryOrders.filter((deliveryOrder) => {
    //   const { password, ...userWithoutPassword } = user;
    //   return userWithoutPassword;
    // });

    return {
      data: deliveryOrders,
      meta: { total, take, page },
    };
  } catch (error) {
    throw error;
  }
};
