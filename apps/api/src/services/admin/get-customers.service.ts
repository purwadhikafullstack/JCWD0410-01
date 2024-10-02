import prisma from '@/prisma';
import { Prisma, Role, User } from '@prisma/client';

interface GetCustomersInterface {
  page: number;
  take: number;
  sortBy: string;
  sortOrder: string;
  search: string;
  // email?: string;
  // name?: string;
  // phone?: string;
}

export const getCustomersService = async (query: GetCustomersInterface) => {
  try {
    const { page, take, sortBy, sortOrder, search } = query;

    const whereClause: Prisma.UserWhereInput = {
      isDeleted: false,
      role: 'CUSTOMER',
    };

    if (search) {
      whereClause.OR = [
        { email: { contains: search } },
        { name: { contains: search } },
        { phoneNumber: { contains: search } },
      ];
    }

    // if (email) {
    //   whereClause.email = { contains: email };
    // }

    // if (name) {
    //   whereClause.name = { contains: name };
    // }

    // if (phone) {
    //   whereClause.phoneNumber = { contains: phone };
    // }

    const users = await prisma.user.findMany({
      where: whereClause,
      include: { addresses: {where: {isPrimary: true}}},
      take: take,
      skip: (page - 1) * take,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    const total = await prisma.user.count({
      where: whereClause,
    });

    const usersWithoutPassword = users.filter((user) => {
      const { password, token, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    return {
      data: usersWithoutPassword,
      meta: { total, take, page },
    };
  } catch (error) {
    throw error;
  }
};
