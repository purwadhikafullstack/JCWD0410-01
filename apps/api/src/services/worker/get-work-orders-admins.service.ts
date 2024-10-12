import prisma from '@/prisma';
import { Prisma, Role, User } from '@prisma/client';
import e from 'cors';

interface GetWorkOrdersAdminsInterface {
  page: number;
  take: number;
  sortBy: string;
  sortOrder: string;
  search: string;
  status: 'REQUEST' | 'ONGOING' | 'HISTORY' | 'ALL';
  outletId: string;
}

export const getWorkOrdersAdminsService = async (
  query: GetWorkOrdersAdminsInterface,
  userId: number,
) => {
  try {
    const { page, take, sortBy, sortOrder, search, status, outletId } = query;

    const employee = await prisma.user.findFirst({
      where: { id: userId, isDeleted: false },
      include: {
        employee: { select: { id: true, outletId: true } },
      },
    });

    if (!employee || !employee.employee) {
      throw new Error('Employee not found');
    }

    let whereClause: Prisma.Work_OrderWhereInput = {
      isDeleted: false,
      order: { orderNumber: undefined },
    };

    if (status === 'REQUEST') {
      whereClause.OR = [
        { status: 'READY_FOR_WASHING' },
        { status: 'READY_FOR_IRONING' },
        { status: 'READY_FOR_PACKING' },
      ];
    }

    if (status === 'ONGOING') {
      whereClause.OR = [
        { status: 'BEING_WASHED' },
        { status: 'BEING_IRONED' },
        { status: 'BEING_PACKED' },
      ];
    }

    if (status === 'HISTORY') {
      whereClause.OR = [
        { status: 'WASHING_COMPLETED' },
        { status: 'IRONING_COMPLETED' },
        { status: 'PACKING_COMPLETED' },
        { status: 'BYPASSED' },
      ];
    }

    if (outletId) {
      whereClause.outletId = Number(outletId);
    }

    if (employee.role === 'OUTLET_ADMIN') {
      whereClause.outletId = employee.employee.outletId;
    }

    if (search) {
      whereClause.order!.orderNumber = { contains: search };
    }

    const workOrders = await prisma.work_Order.findMany({
      where: whereClause,
      include: {
        order: { select: { orderNumber: true } },
        outlet: {select: {name: true}}
      },
      take: take,
      skip: (page - 1) * take,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    const total = await prisma.work_Order.count({
      where: whereClause,
    });

    return {
      data: workOrders,
      meta: { total, take, page },
    };
  } catch (error) {
    throw error;
  }
};
