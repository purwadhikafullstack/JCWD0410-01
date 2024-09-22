import { hashPassword } from '@/lib/bcrypt';
import prisma from '@/prisma';
import { Pickup_Order, PickupStatus } from '@prisma/client';
import { createOrderService } from '../order/create-order.service';
import { createDeliveryService } from '../delivery/create-delivery.service';

interface CreatePickupInterface {
  pickupStatus: 'WAITING_FOR_DRIVER' | 'ONSITE';
  pickupLatitude: string;
  pickupLongitude: string;
  pickupFee: number;
  pickupAddressId: number;
  deliveryStatus: 'PROCESSING_LAUNDRY' | 'ONSITE';
  deliveryLatitude: string;
  deliveryLongitude: string;
  deliveryFee: number;
  deliveryAddressId: number;
  outletId: number;
}

export const createPickupService = async (
  body: CreatePickupInterface,
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
      ...deliveryParams
    } = body;

    if (!outletId) {
      throw new Error('Wajib ada, ini placeholder, pindah ke validator');
    }

    if (!latitude) {
      throw new Error('Wajib ada, ini placeholder, pindah ke validator');
    }

    if (!longitude) {
      throw new Error('Wajib ada, ini placeholder, pindah ke validator');
    }

    if (!fee) {
      throw new Error('Wajib ada, ini placeholder, pindah ke validator');
    }

    if (!addressId) {
      throw new Error('Wajib ada, ini placeholder, pindah ke validator');
    }

    if (!status) {
      throw new Error('Wajib ada, ini placeholder, pindah ke validator');
    }

    return await prisma.$transaction(async (prisma) => {
      const count =
        (await prisma.pickup_Order.count({
          where: {
            userId: customerId,
            // NOT: { status: 'ONSITE' },
          },
        })) + 1;
      const pickupNumber =
        status === 'ONSITE'
          ? `PN-${customerId}-${outletId}-${count}-ONSITE`
          : `PN-${customerId}-${outletId}-${count}`;
      const order = await createOrderService(outletId, customerId);
      const pickupOrder = await prisma.pickup_Order.create({
        data: {
          status,
          userId: customerId,
          latitude,
          longitude,
          orderId: order.id,
          outletId,
          addressId,
          pickupNumber,
          fee,
        },
      });

      const deliveryOrder = await createDeliveryService({
        outletId,
        customerId,
        orderId: order.id,
        ...deliveryParams,
      });
      return {
        message: 'Order succesfully created',
        pickupOrder,
        order,
        deliveryOrder,
      };
    });
  } catch (error) {
    throw error;
  }
};
