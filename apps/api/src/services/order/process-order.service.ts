import prisma from '@/prisma';
import { Prisma } from '@prisma/client';
import { createUserNotificationService } from '../notification/create-user-notification.service';

interface ProcessOrderInterface {
  weight: number;
  orderId: number;
  orderItems: {
    name: string;
    itemQuantity: number;
    laundryItemId: number;
  }[];
}

export const processOrderService = async (
  body: ProcessOrderInterface,
  userId: number,
) => {
  try {
    const { weight, orderId, orderItems } = body;
    const laundryFee = weight * 4000;

    const user = await prisma.user.findFirst({
      where: { id: userId, isDeleted: false},
      select: {role: true,employee: {select: {outletId: true}}}
    });

    if (!user) {
      throw new Error("Authentication Failed")
    }

    const order = await prisma.order.findFirst({
      where: {
        id: orderId, isDeleted: false
      },
    });

    if (!order) {
      throw new Error('Order not found');
    }

    if (user.role === "OUTLET_ADMIN" && user.employee?.outletId !== order.outletId) {
      throw new Error("Order does not belong to this outlet")
    }

    if (order.orderStatus !== 'ARRIVED_AT_OUTLET') {
      throw new Error('Order status mismatched');
    }

    const pickupOrder = await prisma.pickup_Order.findFirst({
      where: { orderId, isDeleted: false },
    });

    if (!pickupOrder) {
      throw new Error('Pickup Order not found');
    }

    const deliveryOrder = await prisma.delivery_Order.findFirst({
      where: { orderId, isDeleted: false },
    });

    if (!deliveryOrder) {
      throw new Error('Delivery Order not found');
    }

    const orderItemsWithOrderId = orderItems.map((item) => {
      return { ...item, orderId };
    });

    return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const total = laundryFee + pickupOrder.fee + deliveryOrder.fee;

      const workOrder = await tx.work_Order.create({
        data: { status: 'READY_FOR_WASHING', orderId, stationId: 1, outletId: order.outletId },
      });

      const washers = await tx.user.findMany({
        where: {
          role: 'WORKER',
          employee: {
            outletId: order.outletId,
            employeeStations: { some: { stationId: 1 } },
          },
        },
        select: {
          id: true,
        },
      });

      await createUserNotificationService(
        { users: washers, notificationId: 5 },
        tx,
      );

      const orderItemsResult = await tx.order_Item.createMany({
        data: orderItemsWithOrderId,
      });

      const processedOrder = await tx.order.update({
        where: { id: orderId },
        data: { total, weight, laundryFee, orderStatus: 'READY_FOR_WASHING' },
      });

      await tx.user_Notification.create({
        data: { userId: order.userId, notificationId: 4 },
      });

      return {
        order: processedOrder,
        workOrder,
        orderItems: orderItemsResult,
        message: 'Process order success',
      };
    });
  } catch (error) {
    throw error;
  }
};
