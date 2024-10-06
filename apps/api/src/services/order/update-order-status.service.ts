import { OrderStatus, Prisma } from '@prisma/client';

export const updateOrderStatusService = async (
  orderId: number,
  status: OrderStatus,
  tx: Prisma.TransactionClient,
) => {
  try {
    if (!status) {
      throw new Error('Wajib ada status, ini placeholder, pindah ke validator');
    }

    if (!orderId) {
      throw new Error(
        'Wajib ada orderid, ini placeholder, pindah ke validator',
      );
    }

    const order = await tx.order.findFirst({
      where: { id: orderId },
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
