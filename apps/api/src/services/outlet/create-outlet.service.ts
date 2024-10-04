import prisma from '@/prisma';
import { Type } from '@prisma/client';

interface CreateOutletBody {
  name: string;
  latitude: string;
  longitude: string;
  type: Type;
}

export const createOutletService = async (body: CreateOutletBody) => {
  try {
    const { name, latitude, longitude, type } = body;

    const existingOutlet = await prisma.outlet.findFirst({
      where: { name },
    });

    if (existingOutlet) {
      throw new Error('Outlet already exist');
    }

    const newOutlet = await prisma.outlet.create({
      data: {
        name,
        latitude,
        longitude,
        type,
      },
    });

    return {
      message: 'Create Outlet Success',
    };
  } catch (error) {
    throw error;
  }
};
