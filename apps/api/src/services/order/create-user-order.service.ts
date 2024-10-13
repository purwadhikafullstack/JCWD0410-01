import prisma from '@/prisma';
import { Prisma } from '@prisma/client';
import { createDeliveryService } from '../delivery/create-delivery.service';
import { createUserNotificationService } from '../notification/create-user-notification.service';
import { createPickupService } from '../pickup/create-pickup.service';
import { createOrderService } from './create-order.service';

interface CreateUserOrderInterface {
  pickupStatus: 'WAITING_FOR_DRIVER' | 'ONSITE';
  pickupLatitude: string;
  pickupLongitude: string;
  pickupFee: number;
  pickupAddressId: number;
  pickupAddress: string;
  deliveryStatus: 'PROCESSING_LAUNDRY' | 'ONSITE';
  deliveryLatitude: string;
  deliveryLongitude: string;
  deliveryFee: number;
  deliveryAddressId: number;
  outletId: number;
  outletName: string;
}

export const createUserOrderService = async (
  body: CreateUserOrderInterface,
  customerId: number,
) => {
  try {
    const {
      pickupStatus: status,
      outletId,
      pickupAddressId: addressId,
      pickupLatitude: latitude,
      pickupLongitude: longitude,
      pickupFee: fee,
      pickupAddress,
      outletName,
      ...deliveryParams
    } = body;

    return await prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const order = await createOrderService(outletId, customerId, tx);
        const pickupOrder = await createPickupService(
          {
            pickupStatus: status,
            pickupAddressId: addressId,
            pickupLatitude: latitude,
            pickupLongitude: longitude,
            pickupFee: fee,
            outletId,
            orderId: order.order.id,
          },
          customerId,
          tx,
        );

        const drivers = await tx.user.findMany({
          where: {
            role: 'DRIVER',
            employee: { outletId },
          },
          select: {
            id: true,
          },
        });

        const pickupNotification = await createUserNotificationService(
          { users: drivers, notificationId: 1 },
          tx,
        );

        const deliveryOrder = await createDeliveryService(
          {
            outletId,
            customerId,
            orderId: order.order.id,
            ...deliveryParams,
          },
          tx,
        );
        return {
          message: 'User order succesfully created',
          order,
          pickupOrder,
          pickupNotification,
          deliveryOrder,
        };
      },
      {
        maxWait: 5000,
        timeout: 10000,
      },
    );
  } catch (error) {
    throw error;
  }
};
