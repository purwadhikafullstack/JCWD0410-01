import prisma from '@/prisma';
import { Type } from '@prisma/client';

interface UpdateOutletBody {
  name: string;
  address: string;
  type: Type;
  latitude: string;
  longitude: string;
}

export const updateOutletService = async (
  outletId: number,
  body: UpdateOutletBody,
) => {
  try {
    const { name, type, address, latitude, longitude } = body;

    const existingOutlet = await prisma.outlet.findFirst({
      where: { id: outletId, isDeleted: false },
    });

    if (!existingOutlet) {
      throw new Error('Address not found');
    }

    await prisma.outlet.update({
      where: { id: outletId },
      data: {
        name,
        type,
        address,
        latitude,
        longitude,
      },
    });

    return {
      message: 'Update Outlet Success',
    };
  } catch (error) {
    throw error;
  }
};
