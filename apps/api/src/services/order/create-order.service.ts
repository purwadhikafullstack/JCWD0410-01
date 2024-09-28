import { Prisma } from '@prisma/client';

export const createOrderService = async (
  outletId: number,
  userId: number,
  tx: Prisma.TransactionClient,
) => {
  try {
    const count =
      (await tx.order.count({
        where: {
          userId,
        },
      })) + 1;

    const orderNumber = `ON-${userId}-O${outletId}-${count}`;

    const order = await tx.order.create({
      data: {
        userId,
        outletId,
        orderNumber,
      },
    });

    return {
      message: "Order succesfully created",
      order,
    }
  } catch (error) {
    throw error;
  }
};
