"use client";

import useAxios from "@/hooks/useAxios";
import { IPageableResponse, IPaginationQueries } from "@/types/pagination";
import { Pickup_Order } from "@/types/pickup-order";
import { WorkOrders } from "@/types/work-order";
import { useQuery } from "@tanstack/react-query";

export interface WorkOrdersAdminsPaginationQueries
  extends IPaginationQueries {
  search?: string;
  status: "ONGOING" | "REQUEST" | "HISTORY" | 'ALL';
  outletId?: string;
}

export interface WorkOrders_AdminExtension extends WorkOrders {
  order: {
    orderNumber: string;
  };
  outlet: {
    name: string;
  }
}

const useGetWorkOrdersAdmins = (
  queries: WorkOrdersAdminsPaginationQueries,
) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["work_orders", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<
        IPageableResponse<WorkOrders_AdminExtension>
      >("/work-orders/admins", {
        params: queries,
      });
      return data;
    },
  });
};

export default useGetWorkOrdersAdmins;
