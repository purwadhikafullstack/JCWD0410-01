import { hashPassword } from '@/lib/bcrypt';
import prisma from '@/prisma';

interface CreateAddressBody {
  name: string;
  address: string;
  city: string;
  district: string;
  latitude: string;
  longitude: string;
}

export const createAddressService = async (
  userId: number,
  body: CreateAddressBody,
) => {
  try {
    const { name, address, city, district, latitude, longitude } = body;

    const existingAddress = await prisma.address.findFirst({
      where: { address, userId },
    });

    if (existingAddress) {
      throw new Error('Address already exist');
    }

    const newAddress = await prisma.address.create({
      data: {
        name,
        address,
        city,
        district,
        latitude,
        longitude,
        userId,
        isPrimary: false,
      },
    });

    return newAddress;
  } catch (error) {
    throw error;
  }
};
