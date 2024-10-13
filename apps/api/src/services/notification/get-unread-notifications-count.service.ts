import prisma from '@/prisma';
import { Prisma } from '@prisma/client';

export const getUnreadNotificationsCountService = async (
  userId: number,
) => {
  try {
    let whereClause: Prisma.User_NotificationWhereInput = {
      isDeleted: false,
      isRead: false,
      userId
    };

    const unreadCount = await prisma.user_Notification.count({
      where: whereClause,
    });

    return {
      unreadCount,
    };
  } catch (error) {
    throw error;
  }
};
