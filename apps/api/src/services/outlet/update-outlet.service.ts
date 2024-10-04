import prisma from '@/prisma';
import { Type } from '@prisma/client';

interface UpdateOutletBody {
  name: string;
  latitude: string;
  longitude: string;
  type: Type;
}

export const updateOutletService = async (
  outletId: number,
  body: UpdateOutletBody,
) => {
  try {
    const { name, latitude, longitude, type } = body;

    const existingOutlet = await prisma.outlet.findFirst({
      where: { id: outletId },
    });

    if (!existingOutlet) {
      throw new Error('Address not found');
    }

    await prisma.outlet.update({
      where: { id: outletId },
      data: {
        name,
        latitude,
        longitude,
        type,
      },
    });

    return {
      message: 'Update Outlet Success',
    };
  } catch (error) {
    throw error;
  }
};
