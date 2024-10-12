import { comparePassword, hashPassword } from '@/lib/bcrypt';
import { cloudinaryUpload } from '@/lib/cloudinary';
import prisma from '@/prisma';
import { User } from '@prisma/client';

interface UpdateUserInterface extends Partial<User> {
  oldPassword?: string;
  stationId?: number;
  outletId?: number;
}

export const updateUserService = async (
  id: number,
  body: UpdateUserInterface,
  file?: Express.Multer.File,
) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id,
        isDeleted: false,
      },
      include: {
        employee: { select: { id: true } },
      },
    });

    if (!user || !user.employee) {
      throw new Error('User not found');
    }

    const { email, role, phoneNumber, password, stationId, outletId } = body;

    if (email) {
      const existingEmail = await prisma.user.findFirst({
        where: {
          email,
        },
      });
      if (existingEmail) {
        throw new Error('This email is already in use.');
      }
    }

    if (phoneNumber) {
      const existingPhoneNumber = await prisma.user.findFirst({
        where: {
          phoneNumber,
        },
      });

      if (existingPhoneNumber) {
        throw new Error('This phone number is already in use.');
      }
    }

    const employee = await prisma.employee.findFirst({
      where: { id: user.employee.id },
    });

    return await prisma.$transaction(
      async (prisma) => {
        body.outletId = undefined;
        body.stationId = undefined;

        console.log(
          `ini password baru: ${password}, ini password lama: ${body.oldPassword}`,
        );

        if (password && body.oldPassword) {
          const compare = await comparePassword(
            body.oldPassword,
            user.password!,
          );

          if (!compare) {
            throw new Error('Old Password is Incorrect');
          }
          body.oldPassword = undefined;
          body.password = await hashPassword(password);
        }

        if (file) {
          const { secure_url } = await cloudinaryUpload(file);
          body.profilePicture = secure_url;
        }

        const updatedUser = await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            ...body,
          },
        });

        if (employee) {
          if (outletId) {
            await prisma.employee.update({
              where: {
                id: user.employee?.id,
              },
              data: {
                outletId: Number(outletId),
              },
            });
          }

          if (updatedUser.role === 'WORKER' && stationId) {
            const existing = await prisma.employee_Station.findFirst({
              where: {
                employeeId: employee.id,
                stationId: Number(stationId),
                isDeleted: false,
              },
            });

            if (!existing) {
              await prisma.employee_Station.create({
                data: {
                  employeeId: employee.id,
                  stationId: Number(stationId),
                },
              });
            }
          }
        }

        return {
          message: 'Update employee success',
          stationId,
          employee,
          role,
        };
      },
      {
        maxWait: 10000, // Increase the waiting time before starting the transaction to 10 seconds
        timeout: 10000, // Increase the transaction timeout to 10 seconds
      },
    );
  } catch (error) {
    throw error;
  }
};
