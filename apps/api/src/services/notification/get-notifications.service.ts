import prisma from '@/prisma';
import { Prisma } from '@prisma/client';

interface GetNotificationsInterface {
  page: number;
  take: number;
  sortBy: string;
  sortOrder: string;
  search: string;
  unRead: string;
}

export const getNotificationsService = async (
  query: GetNotificationsInterface,
  userId: number,
) => {
  try {
    const { page, take, sortBy, sortOrder, search, unRead } = query;

    const user = await prisma.user.findFirst({
      where: { id: userId, isDeleted: false },
    });

    if (!user) {
      throw new Error('User not found');
    }

    let whereClause: Prisma.User_NotificationWhereInput = {
      isDeleted: false,
      userId,
    };

    if (unRead) {
      whereClause.isRead = false;
    }

    const userNotifications = search
      ? await prisma.user_Notification.findMany({
          where: {
            notification: {
              OR: [
                { message: { contains: search } },
                { title: { contains: search } },
              ],
            },
            ...whereClause,
          },
          include: {
            notification: true,
          },
          take: take,
          skip: (page - 1) * take,
          orderBy: {
            [sortBy]: sortOrder,
          },
        })
      : await prisma.user_Notification.findMany({
          where: whereClause,
          include: {
            notification: true,
          },
          take: take,
          skip: (page - 1) * take,
          orderBy: {
            [sortBy]: sortOrder,
          },
        });

    const total = userNotifications.length

    return {
      data: userNotifications,
      meta: { take, page, total },
      whereClause,
    };
  } catch (error) {
    throw error;
  }
};
