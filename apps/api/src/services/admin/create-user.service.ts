import { hashPassword } from '@/lib/bcrypt';
import prisma from '@/prisma';
import { User } from '@prisma/client';

interface CreateUserInterface extends User {
  stationId?: number,
  outletId?: number,
}

export const createUserService = async (body: CreateUserInterface) => {
  try {
    const { name, email, password, role, phoneNumber, stationId, outletId } = body;

    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new Error('User already exist');
    }

    return await prisma.$transaction(async (prisma) => {
      const hashedPassword = await hashPassword(password!);

      const newUser = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
          provider: 'CREDENTIALS',
          role,
          phoneNumber,
          // lastEditBy: 
        },
      });

      if (role !== "CUSTOMER") {
        if (!outletId) {
          throw new Error('Outlet needed for creating new employee')
        }
        const employee = await prisma.employee.create({
          data: {
            outletId: outletId,
            userId: newUser.id,
          }
        })

        if (role === 'WORKER' && stationId) {
          await prisma.employee_Station.create({
            data: {
              employeeId: employee.id,
              stationId: stationId,
            }
          })
        }
      }

      const { password: newUserPassword, ...userWithoutPassword } = newUser;

      return {
        userWithoutPassword,
      };
    });
  } catch (error) {
    throw error;
  }
};
