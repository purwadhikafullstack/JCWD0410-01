import prisma from '@/prisma';

interface UpdateAddressBody {
  name: string;
  address: string;
  city: string;
  district: string;
  latitude: string;
  longitude: string;
}

export const updateAddressService = async (
  userId: number,
  body: UpdateAddressBody,
  addressId: number,
) => {
  try {
    const { name, address, city, district, latitude, longitude } = body;

    const existingAddress = await prisma.address.findFirst({
      where: { id: addressId },
    });

    const sameAddress = await prisma.address.findFirst({
      where: { address, userId },
    });

    if (!existingAddress) {
      throw new Error('Address not found');
    }

    if (sameAddress) {
      throw new Error('Same Address already exist');
    }

    await prisma.address.update({
      where: { id: addressId, userId },
      data: {
        name,
        address,
        city,
        district,
        latitude,
        longitude,
      },
    });

    return {
      message: 'Update Address Success',
    };
  } catch (error) {
    throw error;
  }
};
