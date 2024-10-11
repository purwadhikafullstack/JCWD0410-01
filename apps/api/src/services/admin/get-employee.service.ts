import prisma from '../../prisma';

export const getEmployeeService = async (id: number) => {
  const employee = await prisma.user.findFirst({
    where: {
      id,
      isDeleted: false,
      OR: [{ role: 'OUTLET_ADMIN' }, { role: 'WORKER' }, { role: 'DRIVER' }],
    },
    include: {
      employee: {
        include: {
          employeeStations: { include: { station: true } },
          outlet: true,
        },
      },
    },
  });

  if (!employee) {
    throw new Error('Employee not found');
  }

  return employee;
};
