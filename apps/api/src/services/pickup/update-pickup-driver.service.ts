import { Prisma } from '@prisma/client';
import prisma from '../../prisma';
import { transporter } from '@/lib/nodemailer';
import { createNotificationService } from '../notification/create-notification.service';
import { createUserNotificationService } from '../notification/create-user-notification.service';
import { updateOrderStatusService } from '../order/update-order-status.service';

interface Payload {
  id: number;
  status: 'ACCEPT' | 'CANCEL' | 'FINISH' | 'PICKUP';
}

export const updatePickupOrderDriverService = async (
  body: Payload,
  userId: number,
) => {
  try {
    const { status, id } = body;

    if (!status) {
      throw new Error('Wajib ada status, ini placeholder, pindah ke validator');
    }

    if (!id) {
      throw new Error('Wajib ada id, ini placeholder, pindah ke validator');
    }

    const pickupOrder = await prisma.pickup_Order.findFirst({
      where: { id },
    });

    const employee = await prisma.user.findFirst({
      where: { id: userId },
      include: { employee: { select: { id: true } } },
    });

    if (!pickupOrder) {
      throw new Error('Pickup Order not found');
    }

    return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      if (status === 'ACCEPT') {
        await tx.pickup_Order.update({
          where: { id },
          data: {
            employeeId: employee?.employee?.id,
            status: 'ON_THE_WAY_TO_CUSTOMER',
          },
        });

        const pickupNotification = await createUserNotificationService(
          {
            users: [{ id: pickupOrder.userId }],
            notificationId: 2,
          },
          tx,
        );

        await updateOrderStatusService(
          pickupOrder.orderId,
          'PICKUP_ON_THE_WAY_TO_CUSTOMER',
          tx,
        );
      }

      if (status === 'CANCEL') {
        await tx.pickup_Order.update({
          where: { id },
          data: { employeeId: 1, status: 'WAITING_FOR_DRIVER' },
        });

        const drivers = await tx.user.findMany({
          where: {
            role: 'DRIVER',
            employee: { outletId: pickupOrder.outletId },
          },
          select: {
            id: true,
          },
        });

        const pickupNotification = await createUserNotificationService(
          { users: drivers, notificationId: 1 },
          tx,
        );

        await updateOrderStatusService(
          pickupOrder.orderId,
          'WAITING_FOR_PICKUP_DRIVER',
          tx,
        );
      }

      if (status === 'PICKUP') {
        await tx.pickup_Order.update({
          where: { id },
          data: { status: 'ON_THE_WAY_TO_OUTLET' },
        });

        const pickupNotification = await createUserNotificationService(
          {
            users: [{ id: pickupOrder.userId }],
            notificationId: 3,
          },
          tx,
        );

        await updateOrderStatusService(
          pickupOrder.orderId,
          'PICKUP_ON_THE_WAY_TO_OUTLET',
          tx,
        );
      }

      if (status === 'FINISH') {
        await tx.pickup_Order.update({
          where: { id },
          data: { status: 'RECEIVED_BY_OUTLET' },
        });

        await updateOrderStatusService(
          pickupOrder.orderId,
          'ARRIVED_AT_OUTLET',
          tx,
        );
      }

      // await transporter.sendMail({
      //   to: payment.user.email,
      //   subject: 'Payment Status',
      //   html: `<h1>Your Payment Status has been updated</h1><p>Payment id: ${payment.id}</p><p>New Status: ${status}</p>`,
      // });

      return { message: 'Update pickup order success' };
    });
  } catch (error) {
    throw error;
  }
};
