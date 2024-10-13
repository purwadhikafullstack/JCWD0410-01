import { Prisma } from '@prisma/client';

interface UserNotificationInterface {
  users: {
    id: number;
  }[];
  notificationId: number;
}

export const createUserNotificationService = async (
  body: UserNotificationInterface,
  tx: Prisma.TransactionClient,
) => {
  try {
    const { users, notificationId } = body;

    const data = users.map((user) => {
      return { userId: user.id, notificationId };
    });

    await tx.user_Notification.createMany({
      data,
    });
    return {
      message: 'Notification created',
    };
  } catch (error) {
    throw error;
  }
};
