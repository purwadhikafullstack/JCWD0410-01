import { cancelJobs } from '@/lib/cancelJobs';
import prisma from '@/prisma';
import { Prisma } from '@prisma/client';
import { createUserNotificationService } from '../notification/create-user-notification.service';

interface UpdatePaymentSuccess {
  invoice: string;
}

export const updatePaymentSuccessService = async (
  body: UpdatePaymentSuccess,
) => {
  try {
    const { invoice } = body;

    const payment = await prisma.payment.findFirst({
      where: { invoiceNumber: invoice, isDeleted: false },
    });

    if (!payment) {
      throw new Error('Payment not found');
    }

    const order = await prisma.order.findFirst({
      where: { id: payment.orderId, isDeleted: false },
    });

    if (!order) {
      throw new Error('Order not found');
    }

    if (
      order.orderStatus === 'WAITING_FOR_PICKUP_DRIVER' ||
      order.orderStatus === 'PICKUP_ON_THE_WAY_TO_CUSTOMER' ||
      order.orderStatus === 'PICKUP_ON_THE_WAY_TO_OUTLET' ||
      order.orderStatus === 'ARRIVED_AT_OUTLET'
    ) {
      throw new Error('Waiting for admin to process');
    }

    return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      cancelJobs([payment.invoiceNumber])
      
      await tx.payment.update({
        where: { id: payment.id },
        data: { status: 'SUCCESS' },
      });


      if (order.orderStatus === 'AWAITING_PAYMENT') {
        await tx.order.update({
          where: { id: order.id },
          data: { orderStatus: 'READY_FOR_DELIVERY', isPaid: true },
        });

        const deliveryOrder = await tx.delivery_Order.findFirst({
          where: {
            orderId: order.id,
            isDeleted: false,
          },
          select: { id: true },
        });

        if (!deliveryOrder) {
          throw new Error('Delivery order not found');
        }

        await tx.delivery_Order.update({
          where: {
            id: deliveryOrder.id,
          },
          data: {
            status: 'WAITING_FOR_DRIVER',
          },
        });

        const drivers = await tx.user.findMany({
          where: {
            role: 'DRIVER',
            employee: { outletId: order.outletId },
          },
          select: {
            id: true,
          },
        });

        await createUserNotificationService(
          { users: drivers, notificationId: 9 },
          tx,
        );
      } else {
        await tx.order.update({
          where: { id: order.id },
          data: { isPaid: true },
        });
      }

      return { message: 'Update payment status success' };
    });
  } catch (error) {
    throw error;
  }
};
