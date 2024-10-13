import prisma from '@/prisma';
import { Prisma } from '@prisma/client';
import { endOfMonth, getDaysInMonth } from 'date-fns';

interface GetOrderChartQuery {
  filterMonth: string;
  filterYear: string;
  outletId: number;
}

export const getOrderChartService = async (
  query: GetOrderChartQuery,
  userId: number,
) => {
  try {
    const { filterMonth, outletId, filterYear } = query;

    const existingUser = await prisma.user.findFirst({
      where: { id: userId },
      include: { employee: { select: { outletId: true } } },
    });

    if (!existingUser || !existingUser.employee) {
      throw new Error('User not Found!');
    }

    const whereClause: Prisma.OrderWhereInput = {
      isPaid: true,
    };

    if (outletId) {
      whereClause.outletId = outletId;
    }

    if (existingUser.role === 'OUTLET_ADMIN') {
      whereClause.outletId = existingUser.employee.outletId;
    }

    const now = new Date();
    const month = filterMonth ? Number(filterMonth) - 1 : now.getMonth();
    const year = filterYear ? Number(filterYear) : now.getFullYear();

    function getDaysInSpecificMonth(year: number, month: number): number {
      const date = new Date(year, month);
      return getDaysInMonth(date);
    }
    const daysInMonth = getDaysInSpecificMonth(year, month);

    const incomeDaily: number[] = [];

    const fetchDailyData = async () => {
      for (let i = 1; i <= daysInMonth; i++) {
        const day = new Date(year, month, i);
        const startOfDay = new Date(day.setHours(0, 0, 0, 0));
        const endOfDay = new Date(day.setHours(23, 59, 59, 999));

        const dailyWhereClause = {
          ...whereClause,
          createdAt: {
            gte: startOfDay,
            lt: endOfDay,
          },
        };
        const dailyOrders = await prisma.order.findMany({
          where: dailyWhereClause,
        });

        let totalIncome = 0;

        dailyOrders.forEach((order) => {
          totalIncome += order.total;
        });
        incomeDaily.push(totalIncome);
      }
    };

    await fetchDailyData();

    const incomeMonthly: number[] = [];
    const monthTypes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const fetchMonthlyData = async () => {
      for (const monthType of monthTypes) {
        const startDate = new Date(year, monthType - 1, 1);
        const endDate = endOfMonth(startDate);

        const monthlyWhereClause = {
          ...whereClause,
          createdAt: {
            gte: startDate,
            lt: endDate,
          },
        };

        const monthlyOrders = await prisma.order.findMany({
          where: monthlyWhereClause,
        });

        let totalIncome = 0;

        monthlyOrders.forEach((order) => {
          totalIncome += order.total;
        });

        incomeMonthly.push(totalIncome);
      }
    };

    await fetchMonthlyData();

    const startDate = new Date(year, month, 1);
    const endDate = endOfMonth(startDate);

    whereClause.createdAt = {
      gte: startDate,
      lt: endDate,
    };

    const orders = await prisma.order.findMany({
      where: whereClause,
    });

    let totalIncome = 0;

    orders.forEach((order) => {
      totalIncome += order.total;
    });

    return {
      totalIncome: totalIncome,
      incomeMonthly: incomeMonthly,
      incomeDaily: incomeDaily,
    };
  } catch (error) {
    throw error;
  }
};
