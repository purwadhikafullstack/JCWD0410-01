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

    if (!title) {
      throw new Error('Wajib ada type, ini placeholder, pindah ke validator');
    }

    if (!message) {
      throw new Error('Wajib ada origin, ini placeholder, pindah ke validator');
    }

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
