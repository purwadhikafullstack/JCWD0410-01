import { hashPassword } from '@/lib/bcrypt';
import prisma from '@/prisma';
import { Order } from '@prisma/client';

export const createOrderService = async (outletId: number, userId: number) => {
  try {
    const count = await prisma.order.count({
      where: {
        userId,
      },
    }) + 1;

    const orderNumber = `ON-${userId}-${outletId}-${count}`;

    return await prisma.$transaction(async (prisma) => {
      return await prisma.order.create({
        data: {
          userId,
          outletId,
          orderNumber,
        },
      });
    });
  } catch (error) {
    throw error;
  }
};
