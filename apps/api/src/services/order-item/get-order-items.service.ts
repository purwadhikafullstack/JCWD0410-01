import prisma from '@/prisma';
import { Prisma } from '@prisma/client';

interface GetOrderItemsInterface {
  page: number;
  take: number;
  sortBy: string;
  sortOrder: string;
  workOrderId: number;
}

export const getOrderItemsWorkOrderService = async (query: GetOrderItemsInterface) => {
  try {
    const { page, take, sortBy, sortOrder, workOrderId } = query;

    const workOrder = await prisma.work_Order.findFirst({
      where: {id: workOrderId}
    })

    if (!workOrder) {
      throw new Error("Work order not found")
    }

    const order = await prisma.order.findFirst({
      where: {isDeleted: false, id: workOrder.orderId}
    })

    if (!order) {
      throw new Error("Order not found")
    }

    const whereClause: Prisma.Order_ItemWhereInput = {
      isDeleted: false,
      orderId: order.id,
    };

    const plainOrderItems = await prisma.order_Item.findMany({
      where: whereClause,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    const orderItems = plainOrderItems.map((orderItem) => {
      return { workOrderStatus: workOrder.status, ...orderItem}
    })

    const total = await prisma.order_Item.count({
      where: whereClause,
    });

    return {
      data: orderItems,
      meta: { total, take, page },
    };
  } catch (error) {
    throw error;
  }
};
