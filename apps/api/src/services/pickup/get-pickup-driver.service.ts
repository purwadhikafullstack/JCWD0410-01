import prisma from '@/prisma';
import { Prisma, Role, User } from '@prisma/client';

interface GetPickupInterface {
  page: number;
  take: number;
  sortBy: string;
  sortOrder: string;
  search: string;
  status: 'ONGOING' | 'REQUEST' | 'HISTORY';
}

export const getPickupDriverService = async (
  query: GetPickupInterface,
  userId: number,
) => {
  try {
    const { page, take, sortBy, sortOrder, search, status } = query;

    const employee = await prisma.user.findFirst({
      where: { id: userId, isDeleted: false },
      include: { employee: { select: { id: true, outletId: true } } },
    });

    if (!employee || !employee.employee) {
      throw new Error(
        'Employee not found',
      );
    }

    let whereClause: Prisma.Pickup_OrderWhereInput = {
      isDeleted: false,
      employeeId: employee.employee.id,
    };

    if (status === 'ONGOING') {
      whereClause.OR = [
        { status: 'ON_THE_WAY_TO_OUTLET' },
        { status: 'ON_THE_WAY_TO_CUSTOMER' },
      ];
    }

    if (status === 'REQUEST') {
      whereClause.status = 'WAITING_FOR_DRIVER';
      whereClause.employeeId = undefined;
      whereClause.outletId = employee.employee.outletId;
    }

    if (status === 'HISTORY') {
      whereClause.status = 'RECEIVED_BY_OUTLET';
    }

    if (search) {
      whereClause.pickupNumber = { contains: search };
    }

    const pickupOrders = await prisma.pickup_Order.findMany({
      where: whereClause,
      include: {
        user: { select: { name: true, phoneNumber: true } },
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

    return {
      data: pickupOrders,
      meta: { total, take, page },
    };
  } catch (error) {
    throw error;
  }
};
