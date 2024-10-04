'use client'

import useAxios from "@/hooks/useAxios";
import { IPageableResponse, IPaginationQueries } from "@/types/pagination";
import { Pickup_Order } from "@/types/pickup-order";
import { useQuery } from "@tanstack/react-query";

export interface PickupOrdersDriversPaginationQueries extends IPaginationQueries {
  search?: string;
  status: 'ONGOING' | 'REQUEST' | 'HISTORY';
}

export interface Pickup_Order_Extension extends Pickup_Order {
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
  user: {
    name: string;
    phoneNumber: string;
  }
}

const useGetPickupOrdersDrivers = (queries: PickupOrdersDriversPaginationQueries) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["pickup_orders", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<
        IPageableResponse<Pickup_Order_Extension>
      >("/pickup-orders/drivers", {
        params: queries,
      });
      return data;
    },
  });
};

export default useGetPickupOrdersDrivers;
