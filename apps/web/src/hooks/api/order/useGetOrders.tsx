"use client";

import useAxios from "@/hooks/useAxios";
import { Order, OrderStatus } from "@/types/order";
import { IPageableResponse, IPaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

export interface OrdersPaginationQueries extends IPaginationQueries {
  search?: string;
  status: OrderStatus | "ALL";
  outletId?: string;
}

export interface GetOrders extends Order {
  outlet: {
    name: string;
  };
}

const useGetOrders = (queries: OrdersPaginationQueries) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["orders", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<IPageableResponse<GetOrders>>(
        "/orders",
        {
          params: queries,
        },
      );
      return data;
    },
  });
};

export default useGetOrders;
