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
  isVerified?: string;
  outletId?: number;
}

export const getEmployeesService = async (query: GetEmployeesInterface, userId: number) => {
  try {
    const { page, take, sortBy, sortOrder, email, name, phone, role, isVerified, outletId } = query;

    const user = await prisma.user.findFirst({
      where: {id: userId, isDeleted: false},
      include: {employee: {select: {outletId: true}}}
    })

    if (!user) {
      throw new Error("User Does not exist")
    }

    const whereClause: Prisma.UserWhereInput = {
      isDeleted: false,
      OR: [{role: 'OUTLET_ADMIN'}, {role: 'WORKER'}, {role: 'DRIVER'}, {role: 'ADMIN'}],
    };

    if (role) {
      whereClause.role = role;
    }

    if (outletId) {
      whereClause.employee = {outletId};
    }

    if (user.role === 'OUTLET_ADMIN') {
      whereClause.employee = {outletId: user.employee?.outletId}
      whereClause.OR = [{role: 'OUTLET_ADMIN'}, {role: 'WORKER'}, {role: 'DRIVER'}]
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

    if (isVerified === "VERIFIED") {
      whereClause.isVerified = true;
    }

    if (isVerified === "UNVERIFIED") {
      whereClause.isVerified = false;
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
            // deliveryOrders: true,
            // pickupOrders: true,
            outlet: true,
            // workOrders: true,
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
