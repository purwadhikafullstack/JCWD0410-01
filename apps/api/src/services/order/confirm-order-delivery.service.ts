import { cancelJobs } from '@/lib/cancelJobs';
import prisma from '@/prisma';
import { Prisma } from '@prisma/client';

interface ConfirmOrder {
  orderId: number;
}

export const confirmOrderDeliveryService = async (
  body: ConfirmOrder,
  userId: number,
) => {
  try {
    const { orderId } = body;

    const order = await prisma.order.findFirst({
      where: { id: orderId, isDeleted: false },
    });

    if (!order || order.orderStatus !== 'BEING_DELIVERED_TO_CUSTOMER') {
      throw new Error('Order not found');
    }

    return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      await tx.order.update({
        where: { id: orderId },
        data: { orderStatus: 'RECEIVED_BY_CUSTOMER' },
      });

      cancelJobs([order.orderNumber])

      return { message: 'Update order status success' };
    });
  } catch (error) {
    throw error;
  }
};
