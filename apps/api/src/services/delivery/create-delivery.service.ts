import { Prisma } from '@prisma/client';

interface CreateDeliveryInterface {
  deliveryStatus: 'PROCESSING_LAUNDRY' | 'ONSITE';
  deliveryLatitude: string;
  deliveryLongitude: string;
  deliveryFee: number;
  deliveryAddressId: number;
  outletId: number;
  customerId: number;
  orderId: number;
}

export const createDeliveryService = async (
  body: CreateDeliveryInterface,
  tx: Prisma.TransactionClient,
) => {
  try {
    const {
      deliveryStatus: status,
      deliveryAddressId: addressId,
      deliveryLatitude: latitude,
      deliveryLongitude: longitude,
      deliveryFee: fee,
      outletId,
      customerId,
      orderId,
    } = body;

    if (!outletId) {
      throw new Error(
        'Wajib ada deliveryOutletId, ini placeholder, pindah ke validator',
      );
    }

    if (!latitude) {
      throw new Error(
        'Wajib ada deliveryLatitude, ini placeholder, pindah ke validator',
      );
    }

    if (!longitude) {
      throw new Error(
        'Wajib ada deliveryLongitude, ini placeholder, pindah ke validator',
      );
    }

    if (!fee) {
      throw new Error(
        'Wajib ada deliveryFee, ini placeholder, pindah ke validator',
      );
    }

    if (!addressId) {
      throw new Error(
        'Wajib ada deliveryAddressId, ini placeholder, pindah ke validator',
      );
    }

    if (!status) {
      throw new Error(
        'Wajib ada deliveryStatus, ini placeholder, pindah ke validator',
      );
    }

    const count =
      (await tx.delivery_Order.count({
        where: {
          userId: customerId,
          // NOT: { status: 'ONSITE' },
        },
      })) + 1;
    const deliveryNumber =
      status === 'ONSITE'
        ? `DN-${customerId}-O${outletId}-${count}-ONSITE`
        : `DN-${customerId}-O${outletId}-${count}`;
    const deliveryOrder = await tx.delivery_Order.create({
      data: {
        status,
        userId: customerId,
        latitude,
        longitude,
        orderId,
        outletId,
        addressId,
        deliveryNumber,
        fee,
      },
    });
    return {
      message: 'Delivery order succesfully created',
      deliveryOrder,
    };
  } catch (error) {
    throw error;
  }
};
