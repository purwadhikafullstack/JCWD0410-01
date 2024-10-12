import { hashPassword } from '@/lib/bcrypt';
import { cloudinaryUpload } from '@/lib/cloudinary';
import prisma from '@/prisma';
import { Prisma, User } from '@prisma/client';

interface CreateUserInterface extends User {
  stationId?: number;
  outletId?: number;
}

export const createUserService = async (
  body: CreateUserInterface,
  file?: Express.Multer.File,
) => {
  try {
    const { name, email, password, role, phoneNumber, stationId, outletId } =
      body;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email, phoneNumber }],
      },
    });

    if (existingUser) {
      throw new Error('User already exist');
    }

    return await prisma.$transaction(async (prisma) => {
      body.password = await hashPassword(password!);
      body.provider = 'CREDENTIALS';
      body.outletId = undefined;
      body.stationId = undefined;
      body.isVerified = true;

      if (file) {
        const { secure_url } = await cloudinaryUpload(file);
        body.profilePicture = secure_url;
      }

      const newUser = await prisma.user.create({
        data: {
          ...body,
        },
      });

      if (role !== 'CUSTOMER') {
        if (!outletId) {
          throw new Error('Outlet needed for creating new employee');
        }
        const employee = await prisma.employee.create({
          data: {
            outletId: Number(outletId),
            userId: newUser.id,
          },
        });

        if (role === 'WORKER' && stationId) {
          await prisma.employee_Station.create({
            data: {
              employeeId: employee.id,
              stationId: Number(stationId),
            },
          });
        }
      }

      const { password: newUserPassword, ...userWithoutPassword } = newUser;

      return {
        userWithoutPassword,
        message: 'Create employee success',
      };
    }, {maxWait: 5000, timeout: 10000});
  } catch (error) {
    throw error;
  }
};
