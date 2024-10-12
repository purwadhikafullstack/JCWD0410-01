import prisma from '@/prisma';
import { Prisma } from '@prisma/client';
import { createDeliveryService } from '../delivery/create-delivery.service';
import { createNotificationService } from '../notification/create-notification.service';
import { createUserNotificationService } from '../notification/create-user-notification.service';
import { createOrderService } from './create-order.service';
import { createPickupService } from '../pickup/create-pickup.service';

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

    if (!outletId) {
      throw new Error(
        'Wajib ada pickupOutletId, ini placeholder, pindah ke validator',
      );
    }

    if (!latitude) {
      throw new Error(
        'Wajib ada pickupLatitude, ini placeholder, pindah ke validator',
      );
    }

    if (!longitude) {
      throw new Error(
        'Wajib ada pickupLongitude, ini placeholder, pindah ke validator',
      );
    }

    if (!fee) {
      throw new Error(
        'Wajib ada pickupFee, ini placeholder, pindah ke validator',
      );
    }

    if (!addressId) {
      throw new Error(
        'Wajib ada pickupAddressId, ini placeholder, pindah ke validator',
      );
    }

    if (!status) {
      throw new Error(
        'Wajib ada pickupStatus, ini placeholder, pindah ke validator',
      );
    }

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

        // const notification = await createNotificationService(
        //   {
        //     title: `New Pickup request`,
        //     message: `Requesting Pickup from ${pickupAddress} to ${outletName}`,
        //   },
        //   tx,
        // );

        const drivers = await tx.user.findMany({
          where: {
            role: 'DRIVER',
            employee: { outletId },
          },
          // include: {
          //   employee: { select: { outletId: true } },
          // },
          select: {
            id: true,
          },
        });

        // const outletDrivers = drivers.map((driver) => {
        //   return driver.employee?.outletId === outletId ? {id: driver.id} : {id: 0}
        // }).filter((driverFilter) => driverFilter.id === 0 ? false : true);

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
