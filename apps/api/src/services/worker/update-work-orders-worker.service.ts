import { Prisma, WorkStatus } from '@prisma/client';
import prisma from '../../prisma';
import { transporter } from '@/lib/nodemailer';
import { createNotificationService } from '../notification/create-notification.service';
import { createUserNotificationService } from '../notification/create-user-notification.service';
import { updateOrderStatusService } from '../order/update-order-status.service';

interface Payload {
  id: number;
  status: WorkStatus;
}

export const updateWorkOrdersWorkersService = async (
  body: Payload,
  userId: number,
) => {
  try {
    const { status, id } = body;

    if (!status) {
      throw new Error('Wajib ada status, ini placeholder, pindah ke validator');
    }

    if (!id) {
      throw new Error('Wajib ada id, ini placeholder, pindah ke validator');
    }

    const workOrder = await prisma.work_Order.findFirst({
      where: { id, isDeleted: false },
    });

    const employee = await prisma.user.findFirst({
      where: { id: userId, isDeleted: false },
      include: {
        employee: {
          select: {
            id: true,
            outletId: true,
            employeeStations: { select: { stationId: true } },
          },
        },
      },
    });

    if (!workOrder) {
      throw new Error('Pickup Order not found');
    }

    if (!employee) {
      throw new Error('Employee not found');
    }

    if (workOrder.outletId !== employee.employee?.outletId) {
      throw new Error('Outlet does not matched');
    }

    return await prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        if (status === 'READY_FOR_WASHING') {
          let correctStation = false;
          employee.employee?.employeeStations.forEach((station) => {
            if (station.stationId === workOrder.stationId) {
              correctStation = true;
            }
          });

          if (!correctStation) {
            throw new Error('Station does not matched');
          }

          await tx.work_Order.update({
            where: { id },
            data: {
              employeeId: employee.employee?.id,
              status: 'BEING_WASHED',
            },
          });

          await updateOrderStatusService(workOrder.orderId, 'BEING_WASHED', tx);
        }

        if (status === 'BEING_WASHED') {
          if (workOrder.employeeId !== employee.employee?.id) {
            throw new Error('Employee Id does not match');
          }

          await tx.work_Order.update({
            where: { id },
            data: {
              status: 'WASHING_COMPLETED',
            },
          });

          await updateOrderStatusService(
            workOrder.orderId,
            'WASHING_COMPLETED',
            tx,
          );

          const ironOrder = await tx.work_Order.create({
            data: {
              status: 'READY_FOR_IRONING',
              orderId: workOrder.orderId,
              stationId: 2,
              outletId: workOrder.outletId,
            },
          });

          const ironers = await tx.user.findMany({
            where: {
              role: 'WORKER',
              employee: {
                outletId: workOrder.outletId,
                employeeStations: { some: { stationId: 2 } },
              },
            },
            select: {
              id: true,
            },
          });

          await createUserNotificationService(
            { users: ironers, notificationId: 6 },
            tx,
          );
        }

        if (status === 'READY_FOR_IRONING') {
          let correctStation = false;
          employee.employee?.employeeStations.forEach((station) => {
            if (station.stationId === workOrder.stationId) {
              correctStation = true;
            }
          });

          if (!correctStation) {
            throw new Error('Station does not matched');
          }

          await tx.work_Order.update({
            where: { id },
            data: {
              employeeId: employee.employee?.id,
              status: 'BEING_IRONED',
            },
          });

          await updateOrderStatusService(workOrder.orderId, 'BEING_IRONED', tx);
        }

        if (status === 'BEING_IRONED') {
          if (workOrder.employeeId !== employee.employee?.id) {
            throw new Error('Employee Id does not match');
          }

          await tx.work_Order.update({
            where: { id },
            data: {
              status: 'IRONING_COMPLETED',
            },
          });

          await updateOrderStatusService(
            workOrder.orderId,
            'IRONING_COMPLETED',
            tx,
          );

          const packOrder = await tx.work_Order.create({
            data: {
              status: 'READY_FOR_PACKING',
              orderId: workOrder.orderId,
              stationId: 3,
              outletId: workOrder.outletId,
            },
          });

          const packers = await tx.user.findMany({
            where: {
              role: 'WORKER',
              employee: {
                outletId: workOrder.outletId,
                employeeStations: { some: { stationId: 3 } },
              },
            },
            select: {
              id: true,
            },
          });

          await createUserNotificationService(
            { users: packers, notificationId: 7 },
            tx,
          );
        }

        if (status === 'READY_FOR_PACKING') {
          let correctStation = false;
          employee.employee?.employeeStations.forEach((station) => {
            if (station.stationId === workOrder.stationId) {
              correctStation = true;
            }
          });

          if (!correctStation) {
            throw new Error('Station does not matched');
          }

          await tx.work_Order.update({
            where: { id },
            data: {
              employeeId: employee.employee?.id,
              status: 'BEING_PACKED',
            },
          });

          await updateOrderStatusService(workOrder.orderId, 'BEING_PACKED', tx);
        }

        if (status === 'BEING_PACKED') {
          if (workOrder.employeeId !== employee.employee?.id) {
            throw new Error('Employee Id does not match');
          }

          await tx.work_Order.update({
            where: { id },
            data: {
              status: 'PACKING_COMPLETED',
            },
          });

          const order = await tx.order.findFirst({
            where: { id: workOrder.orderId, isDeleted: false },
          });

          if (!order) {
            throw new Error('Order not found');
          }

          if (order.isPaid) {
            await updateOrderStatusService(
              workOrder.orderId,
              'READY_FOR_DELIVERY',
              tx,
            );

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
          } else if (!order.isPaid) {
            await updateOrderStatusService(
              workOrder.orderId,
              'AWAITING_PAYMENT',
              tx,
            );

            await tx.user_Notification.create({
              data: { userId: order.userId, notificationId: 11 },
            });
          }
        }

        if (status === 'BYPASSED') {
          if (workOrder.employeeId !== employee.employee?.id) {
            throw new Error('Employee Id does not match');
          }

          await tx.work_Order.update({
            where: { id },
            data: {
              status: 'BYPASSED',
            },
          });

          if (workOrder.stationId === 1) {
            await updateOrderStatusService(
              workOrder.orderId,
              'WASHING_COMPLETED',
              tx,
            );

            const ironOrder = await tx.work_Order.create({
              data: {
                status: 'READY_FOR_IRONING',
                orderId: workOrder.orderId,
                stationId: 2,
                outletId: workOrder.outletId,
              },
            });

            const ironers = await tx.user.findMany({
              where: {
                role: 'WORKER',
                employee: {
                  outletId: workOrder.outletId,
                  employeeStations: { some: { stationId: 2 } },
                },
              },
              select: {
                id: true,
              },
            });

            await createUserNotificationService(
              { users: ironers, notificationId: 6 },
              tx,
            );
          }

          if (workOrder.stationId === 2) {
            await updateOrderStatusService(
              workOrder.orderId,
              'IRONING_COMPLETED',
              tx,
            );

            const ironOrder = await tx.work_Order.create({
              data: {
                status: 'READY_FOR_PACKING',
                orderId: workOrder.orderId,
                stationId: 3,
                outletId: workOrder.outletId,
              },
            });

            const packers = await tx.user.findMany({
              where: {
                role: 'WORKER',
                employee: {
                  outletId: workOrder.outletId,
                  employeeStations: { some: { stationId: 3 } },
                },
              },
              select: {
                id: true,
              },
            });

            await createUserNotificationService(
              { users: packers, notificationId: 7 },
              tx,
            );
          }

          if (workOrder.stationId === 3) {
            const order = await tx.order.findFirst({
              where: { id: workOrder.orderId, isDeleted: false },
            });

            if (!order) {
              throw new Error('Order not found');
            }

            if (order.isPaid) {
              await updateOrderStatusService(
                workOrder.orderId,
                'READY_FOR_DELIVERY',
                tx,
              );

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
            } else if (!order.isPaid) {
              await updateOrderStatusService(
                workOrder.orderId,
                'AWAITING_PAYMENT',
                tx,
              );

              await tx.user_Notification.create({
                data: { userId: order.userId, notificationId: 11 },
              });
            }
          }
        }

        return { message: 'Update pickup order success' };
      },
      { maxWait: 5000, timeout: 10000 },
    );
  } catch (error) {
    throw error;
  }
};
