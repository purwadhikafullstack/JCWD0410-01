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

    if (!users) {
      throw new Error('Wajib ada type, ini placeholder, pindah ke validator');
    }

    if (!notificationId) {
      throw new Error('Wajib ada origin, ini placeholder, pindah ke validator');
    }

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
