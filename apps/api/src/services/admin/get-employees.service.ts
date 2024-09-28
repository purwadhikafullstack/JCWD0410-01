import prisma from '@/prisma';
import { Prisma, Role } from '@prisma/client';

interface GetEmployeesInterface {
  page: number;
  take: number;
  sortBy: string;
  sortOrder: string;
  email?: string;
  name?: string;
  phone?: string;
  role?: Role;
  // outletId?: number;
}

export const getEmployeesService = async (query: GetEmployeesInterface) => {
  try {
    const { page, take, sortBy, sortOrder, email, name, phone, role } = query;

    const whereClause: Prisma.UserWhereInput = {
      isDeleted: false,
      OR: [{role: 'OUTLET_ADMIN'}, {role: 'WORKER'}, {role: 'DRIVER'}],
    };

    if (role) {
      whereClause.role = role;
      whereClause.OR = [];
    }

    if (email) {
      whereClause.email = { contains: email };
    }

    if (name) {
      whereClause.name = { contains: name };
    }

    if (phone) {
      whereClause.phoneNumber = { contains: phone };
    }

    const users = await prisma.user.findMany({
      where: whereClause,
      take: take,
      skip: (page - 1) * take,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: {
        employee: {
          include: {
            employeeStations: { include: { station: true } },
            deliveryOrders: true,
            pickupOrders: true,
            outlet: true,
            workOrders: true,
          },
        },
      },
    });

    const total = await prisma.user.count({
      where: whereClause,
    });

    const usersWithoutPassword = users.filter((user) => {
      const {password, ...userWithoutPassword} = user;
      return userWithoutPassword;
    })

    return {
      data: usersWithoutPassword,
      meta: { total, take, page },
    };
  } catch (error) {
    throw error;
  }
};
