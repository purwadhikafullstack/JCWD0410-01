"use client";

import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

interface PaymentChartData {
  totalIncome: number;
  incomeMonthly: number[];
  incomeDaily: number[];
}

interface GetOrderChartQuery {
  filterMonth: string;
  filterYear: string;
  outletId: string;
}

const useGetOrdersChart = (queries: GetOrderChartQuery) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["orders", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PaymentChartData>("/orders/chart", {
        params: queries,
      });
      return data;
    },
  });
};

export default useGetOrdersChart;
