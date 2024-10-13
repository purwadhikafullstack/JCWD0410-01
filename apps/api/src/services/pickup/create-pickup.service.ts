import { Prisma } from '@prisma/client';

interface CreatePickupInterface {
  pickupStatus: 'WAITING_FOR_DRIVER' | 'ONSITE';
  pickupLatitude: string;
  pickupLongitude: string;
  pickupFee: number;
  pickupAddressId: number;
  outletId: number;
  orderId: number;
}

export const createPickupService = async (
  body: CreatePickupInterface,
  customerId: number,
  tx: Prisma.TransactionClient,
) => {
  try {
    const {
      pickupStatus: status,
      pickupAddressId: addressId,
      pickupLatitude: latitude,
      pickupLongitude: longitude,
      pickupFee: fee,
      outletId,
      orderId,
    } = body;

    const count =
      (await tx.pickup_Order.count({
        where: {
          userId: customerId,
        },
      })) + 1;
    const pickupNumber =
      status === 'ONSITE'
        ? `PN-${customerId}-O${outletId}-${count}-ONSITE`
        : `PN-${customerId}-O${outletId}-${count}`;

    const pickupOrder = await tx.pickup_Order.create({
      data: {
        status,
        userId: customerId,
        latitude,
        longitude,
        orderId,
        outletId,
        addressId,
        pickupNumber,
        fee,
      },
    });
    return {
      message: 'Pickup order succesfully created',
      pickupOrder,
    };
  } catch (error) {
    throw error;
  }
};
