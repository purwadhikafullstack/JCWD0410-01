import prisma from '../../prisma';

interface Payload {
  id: number;
  bypassNote: string;
}

export const bypassWorkOrderService = async (
  body: Payload,
  userId: number,
) => {
  try {
    const { bypassNote, id } = body;

    const workOrder = await prisma.work_Order.findFirst({
      where: { id, isDeleted: false },
    });

    if (!workOrder) {
      throw new Error('Work Order not found');
    }
    if (!workOrder.byPassed) {
      throw new Error('Bypass status mismatched');
    }

    const admin = await prisma.user.findFirst({
      where: {
        id: userId,
        isDeleted: false,
        OR: [{ role: 'ADMIN' }, { role: 'OUTLET_ADMIN' }],
      },
      include: { employee: { select: { outletId: true } } },
    });

    if (!admin) {
      throw new Error('Admin not found');
    }

    if (admin.role === 'OUTLET_ADMIN') {
      if (workOrder.outletId !== admin.employee?.outletId) {
        throw new Error('Outlet does not matched');
      }
    }

    const updatedWorkOrder = await prisma.work_Order.update({
      where: { id },
      data: { bypassNote },
    });

    return { message: 'Updated bypass', updatedWorkOrder };
  } catch (error) {
    throw error;
  }
};
