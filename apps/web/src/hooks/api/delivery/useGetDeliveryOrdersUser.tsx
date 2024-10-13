"use client";

import useAxios from "@/hooks/useAxios";
import { Delivery_Order } from "@/types/delivery-order";
import { IPageableResponse, IPaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

export interface DeliveryOrdersUsersPaginationQueries extends IPaginationQueries {
  search?: string;
  status: "ONGOING" | "HISTORY" | "ALL";
}

export interface Delivery_Order_User_Extension extends Delivery_Order {
  address: {
    latitude: string;
    longitude: string;
    address: string;
  };
  outlet: {
    latitude: string;
    longitude: string;
    name: string;
  };
  employee: {
    user: {
      phoneNumber: string | null;
      name: string | null;
    };
  };
}

const useGetDeliveryOrdersUser = (
  queries: DeliveryOrdersUsersPaginationQueries,
) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["delivery_orders", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<
        IPageableResponse<Delivery_Order_User_Extension>
      >("/delivery-orders/users", {
        params: queries,
      });
      return data;
    },
  });
};

export default useGetDeliveryOrdersUser;
