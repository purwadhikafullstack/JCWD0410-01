import prisma from '../../prisma';

export const getOrderUserService = async (orderId: number, userId: number) => {
  try {
    const user = await prisma.user.findFirst({
      where: { id: userId, isDeleted: false },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const orderItems = await prisma.order_Item.findMany({
      where: {
        orderId,
      },
    });

    const order = await prisma.order.findFirst({
      where: { id: orderId },
      include: {
        outlet: { select: { name: true } },
        user: { select: { name: true, email: true } },
        deliveryOrders: {
          where: { isDeleted: false },
          select: { deliveryNumber: true, fee: true, status: true },
        },
        pickupOrders: {
          where: { isDeleted: false },
          select: { pickupNumber: true, fee: true },
        },
      },
    });

    if (!order || order.userId !== userId) {
      throw new Error('Order not found');
    }

    const orderWithItems = {orderItems, ...order}

    return orderWithItems;
  } catch (error) {
    throw error;
  }
};
