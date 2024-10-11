import prisma from '@/prisma';
import { Type } from '@prisma/client';

interface CreateOutletBody {
  name: string;
  type: Type;
  address: string;
  latitude: string;
  longitude: string;
}

export const createOutletService = async (body: CreateOutletBody) => {
  try {
    const { name, address, latitude, longitude, type } = body;

    const existingOutlet = await prisma.outlet.findFirst({
      where: { name },
    });

    if (existingOutlet) {
      throw new Error('Outlet already exist');
    }

    const newOutlet = await prisma.outlet.create({
      data: {
        name,
        address,
        type,
        latitude,
        longitude,
      },
    });

    return {
      message: 'Create Outlet Success',
    };
  } catch (error) {
    throw error;
  }
};
