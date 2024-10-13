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

    const count =
      (await tx.delivery_Order.count({
        where: {
          userId: customerId,
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
