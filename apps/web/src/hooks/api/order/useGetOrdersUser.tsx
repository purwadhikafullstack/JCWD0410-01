"use client";

import useAxios from "@/hooks/useAxios";
import { Order, OrderStatus } from "@/types/order";
import { IPageableResponse, IPaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

export interface OrdersPaginationQueries extends IPaginationQueries {
  search?: string;
  status: OrderStatus | "ALL";
}

export interface GetOrders extends Order {
  outlet: {
    name: string;
  };
}

const useGetOrdersUsers = (queries: OrdersPaginationQueries) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["orders", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<IPageableResponse<GetOrders>>(
        "/orders/users",
        {
          params: queries,
        },
      );
      return data;
    },
  });
};

export default useGetOrdersUsers;
