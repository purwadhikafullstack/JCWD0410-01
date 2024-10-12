import prisma from '../../prisma';

export const getWorkOrderAdminsService = async (workId: number, userId: number) => {
  try {
    const user = await prisma.user.findFirst({
      where: { id: userId, isDeleted: false },
      include: { employee: { select: { outletId: true } } },
    });

    if (!user || !user.employee) {
      throw new Error('User not found');
    }

    const workOrder = await prisma.work_Order.findFirst({
      where: { id: workId },
    });

    if (!workOrder) {
      throw new Error('Order not found');
    }

    if (
      user.role === 'OUTLET_ADMIN' &&
      workOrder.outletId !== user.employee.outletId
    ) {
      throw new Error('User unauthorized');
    }

    if (!workOrder.byPassed) {
      throw new Error('Bypass status mismatched')
    }

    return workOrder;
  } catch (error) {
    throw error;
  }
};
