import { MIDTRANS_CLIENT_KEY, MIDTRANS_SERVER_KEY } from '@/config';
import { hashPassword } from '@/lib/bcrypt';
import { cloudinaryUpload } from '@/lib/cloudinary';
import prisma from '@/prisma';
import { Prisma, User } from '@prisma/client';
import { MidtransClient } from 'midtrans-node-client';
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

      // const count = (await tx.payment.count({ where: { orderId } })) + 1;
      // const invoiceNumber = order.orderNumber + '-' + count;

      // const snap = new MidtransClient.Snap({
      //   isProduction: false,
      //   clientKey: MIDTRANS_CLIENT_KEY,
      //   serverKey: MIDTRANS_SERVER_KEY,
      // });

      // const payment = await tx.payment.create

      // const payload = {
      //   transaction_details: {
      //     order_id: payment.invoiceNumber,
      //     gross_amount: amount,
      //   },
      // };

      // const transaction = await snap.createTransaction(payload);

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
