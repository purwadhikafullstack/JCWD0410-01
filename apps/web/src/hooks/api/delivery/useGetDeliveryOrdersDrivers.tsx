'use client'

import useAxios from "@/hooks/useAxios";
import { Delivery_Order } from "@/types/delivery-order";
import { IPageableResponse, IPaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

export interface DeliveryOrdersDriversPaginationQueries extends IPaginationQueries {
  search?: string;
  status: 'ONGOING' | 'REQUEST' | 'HISTORY';
}

export interface Delivery_Order_Extension extends Delivery_Order {
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

const useGetDeliveryOrdersDrivers = (queries: DeliveryOrdersDriversPaginationQueries) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["delivery_orders", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<
        IPageableResponse<Delivery_Order_Extension>
      >("/delivery-orders/drivers", {
        params: queries,
      });
      return data;
    },
  });
};

export default useGetDeliveryOrdersDrivers;
