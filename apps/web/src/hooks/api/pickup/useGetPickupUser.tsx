"use client";

import useAxios from "@/hooks/useAxios";
import { IPageableResponse, IPaginationQueries } from "@/types/pagination";
import { Pickup_Order } from "@/types/pickup-order";
import { useQuery } from "@tanstack/react-query";

export interface PickupOrdersUsersPaginationQueries extends IPaginationQueries {
  search?: string;
  status: "ONGOING" | "HISTORY" | "ALL";
}

export interface Pickup_Order_User_Extension extends Pickup_Order {
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

const useGetPickupOrdersUsers = (
  queries: PickupOrdersUsersPaginationQueries,
) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["pickup_orders", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<
        IPageableResponse<Pickup_Order_User_Extension>
      >("/pickup-orders/users", {
        params: queries,
      });
      return data;
    },
  });
};

export default useGetPickupOrdersUsers;
