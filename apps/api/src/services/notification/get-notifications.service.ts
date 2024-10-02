import prisma from '@/prisma';
import { Prisma, Role, User } from '@prisma/client';

interface GetNotificationsInterface {
  page: number;
  take: number;
  sortBy: string;
  sortOrder: string;
  search: string;
  unRead: boolean;
}

export const getNotificationsService = async (
  query: GetNotificationsInterface,
  userId: number,
) => {
  try {
    const { page, take, sortBy, sortOrder, search, unRead } = query;

    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      throw new Error(
        'User not found, ini placeholder, pindah ke validator',
      );
    }

    let whereClause: Prisma.User_NotificationWhereInput = {
      isDeleted: false,
      userId,
    };

    if (unRead) {
      whereClause.isRead = false;
    }

    const pickupOrders = await prisma.user_Notification.findMany({
      where: whereClause,
      include: {
        notification: {}
      },
      take: take,
      skip: (page - 1) * take,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });


    // const usersWithoutPassword = deliveryOrders.filter((deliveryOrder) => {
    //   const { password, ...userWithoutPassword } = user;
    //   return userWithoutPassword;
    // });

    return {
      data: pickupOrders,
      meta: { take, page },
      whereClause,
    };
  } catch (error) {
    throw error;
  }
};
