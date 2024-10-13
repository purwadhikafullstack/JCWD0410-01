import { OrderStatus, Prisma } from '@prisma/client';

export const updateOrderStatusService = async (
  orderId: number,
  status: OrderStatus,
  tx: Prisma.TransactionClient,
) => {
  try {

    const order = await tx.order.findFirst({
      where: { id: orderId, isDeleted: false },
    });

    if (!order) {
      throw new Error(
        'Order not found',
      );
    }

    await tx.order.update({
      where: {id: orderId},
      data: {orderStatus: status}
    })

    return { message: 'Update order status success' };
  } catch (error) {
    throw error;
  }
};
