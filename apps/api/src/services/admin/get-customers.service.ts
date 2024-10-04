import prisma from '@/prisma';
import { Prisma, Role, User } from '@prisma/client';

interface GetCustomersInterface {
  page: number;
  take: number;
  sortBy: string;
  sortOrder: string;
  search: string;
  isVerified?: string;
  // email?: string;
  // name?: string;
  // phone?: string;
}

export const getCustomersService = async (query: GetCustomersInterface) => {
  try {
    const { page, take, sortBy, sortOrder, search, isVerified } = query;

    const whereClause: Prisma.UserWhereInput = {
      isDeleted: false,
      role: 'CUSTOMER',
    };

    if (search) {
      whereClause.OR = [
        { email: { contains: search } },
        { name: { contains: search } },
        { phoneNumber: { contains: search } },
        {addresses: {some: {AND: {isPrimary: true, address: {contains: search}}}}}
      ];
    }

    if (isVerified === "VERIFIED") {
      whereClause.isVerified = true;
    }

    if (isVerified === "UNVERIFIED") {
      whereClause.isVerified = false;
    }

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
