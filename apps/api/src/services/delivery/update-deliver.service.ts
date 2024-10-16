import { Prisma } from '@prisma/client';
import { scheduleJob } from 'node-schedule';
import prisma from '../../prisma';
import { createUserNotificationService } from '../notification/create-user-notification.service';
import { updateOrderStatusService } from '../order/update-order-status.service';

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

        const orderNumber = await tx.order.findFirst({
          where: {id: deliveryOrder.orderId},
          select: {orderNumber: true}
        })

        if (!orderNumber) {
          throw new Error("Order not found")
        }

        const twoMinuteFromNow = new Date(Date.now() + 120 * 1000);
        scheduleJob(orderNumber.orderNumber, twoMinuteFromNow, async () => {
          updateOrderStatusService(
            deliveryOrder.orderId,
            'RECEIVED_BY_CUSTOMER',
            tx,
          );
        });
      }

      return { message: 'Update delivery order success' };
    });
  } catch (error) {
    throw error;
  }
};
