import { Prisma } from '@prisma/client';
import prisma from '../../prisma';
import { transporter } from '@/lib/nodemailer';
import { createNotificationService } from '../notification/create-notification.service';
import { createUserNotificationService } from '../notification/create-user-notification.service';
import { updateOrderStatusService } from '../order/update-order-status.service';
import { scheduleJob } from 'node-schedule';

interface Payload {
  id: number;
  status: 'ACCEPT' | 'CANCEL' | 'FINISH' | 'DELIVER';
}

export const updateDeliveryOrderDriverService = async (
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

    const deliveryOrder = await prisma.delivery_Order.findFirst({
      where: { id, isDeleted: false },
    });

    const employee = await prisma.user.findFirst({
      where: { id: userId, isDeleted: false },
      include: { employee: { select: { id: true } } },
    });

    if (!deliveryOrder) {
      throw new Error('Delivery Order not found');
    }

    if (!employee) {
      throw new Error('Employee not found');
    }

    return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      if (status === 'ACCEPT') {
        await tx.delivery_Order.update({
          where: { id },
          data: {
            employeeId: employee.employee?.id,
            status: 'ON_THE_WAY_TO_OUTLET',
          },
        });

        const pickupNotification = await createUserNotificationService(
          {
            users: [{ id: deliveryOrder.userId }],
            notificationId: 8,
          },
          tx,
        );

        await updateOrderStatusService(
          deliveryOrder.orderId,
          'WAITING_FOR_DELIVERY_DRIVER',
          tx,
        );
      }

      if (status === 'CANCEL') {
        await tx.delivery_Order.update({
          where: { id },
          data: { employeeId: 1, status: 'WAITING_FOR_DRIVER' },
        });

        const drivers = await tx.user.findMany({
          where: {
            role: 'DRIVER',
            employee: { outletId: deliveryOrder.outletId },
          },
          select: {
            id: true,
          },
        });

        const pickupNotification = await createUserNotificationService(
          { users: drivers, notificationId: 9 },
          tx,
        );

        await updateOrderStatusService(
          deliveryOrder.orderId,
          'READY_FOR_DELIVERY',
          tx,
        );
      }

      if (status === 'DELIVER') {
        await tx.delivery_Order.update({
          where: { id },
          data: { status: 'ON_THE_WAY_TO_CUSTOMER' },
        });

        await updateOrderStatusService(
          deliveryOrder.orderId,
          'BEING_DELIVERED_TO_CUSTOMER',
          tx,
        );
      }

      if (status === 'FINISH') {
        await tx.delivery_Order.update({
          where: { id },
          data: { status: 'RECEIVED_BY_CUSTOMER' },
        });

        await createUserNotificationService(
          {
            users: [{ id: deliveryOrder.userId }],
            notificationId: 10,
          },
          tx,
        );

        const oneMinuteFromNow = new Date(Date.now() + 60 * 1000);
        scheduleJob('Complete user order', oneMinuteFromNow, () => {
          updateOrderStatusService(
            deliveryOrder.orderId,
            'RECEIVED_BY_CUSTOMER',
            tx,
          );
        });
      }

      // await transporter.sendMail({
      //   to: payment.user.email,
      //   subject: 'Payment Status',
      //   html: `<h1>Your Payment Status has been updated</h1><p>Payment id: ${payment.id}</p><p>New Status: ${status}</p>`,
      // });

      return { message: 'Update delivery order success' };
    });
  } catch (error) {
    throw error;
  }
};
