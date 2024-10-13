import { Prisma } from '@prisma/client';

interface CreateNotificationInterface {
  title: string;
  message: string;
}

export const createNotificationService = async (
  body: CreateNotificationInterface,
  tx: Prisma.TransactionClient,
) => {
  try {
    const { title, message } = body;

    const notif = await tx.notification.create({
      data: {
        title,
        message
      },
    });

    return {
      message: 'Notification created',
      data: notif,
    };
  } catch (error) {
    throw error;
  }
};
