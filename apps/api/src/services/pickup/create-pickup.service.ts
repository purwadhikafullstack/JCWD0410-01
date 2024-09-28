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

    const count =
      (await tx.pickup_Order.count({
        where: {
          userId: customerId,
          // NOT: { status: 'ONSITE' },
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
