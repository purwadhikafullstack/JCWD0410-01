import prisma from '@/prisma';

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

export const createDeliveryService = async (body: CreateDeliveryInterface) => {
  try {
    const {
      deliveryStatus: status,
      outletId,
      deliveryAddressId: addressId,
      deliveryLatitude: latitude,
      deliveryLongitude: longitude,
      deliveryFee: fee,
      customerId,
      orderId,
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
        (await prisma.delivery_Order.count({
          where: {
            userId: customerId,
            // NOT: { status: 'ONSITE' },
          },
        })) + 1;
      const deliveryNumber =
        status === 'ONSITE'
          ? `DN-${customerId}-${outletId}-${count}-ONSITE`
          : `DN-${customerId}-${outletId}-${count}`;
      const deliveryOrder = await prisma.delivery_Order.create({
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
        deliveryOrder,
      };
    });
  } catch (error) {
    throw error;
  }
};
