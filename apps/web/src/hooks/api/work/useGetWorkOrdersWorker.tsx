"use client";

import useAxios from "@/hooks/useAxios";
import { IPageableResponse, IPaginationQueries } from "@/types/pagination";
import { Pickup_Order } from "@/types/pickup-order";
import { WorkOrders } from "@/types/work-order";
import { useQuery } from "@tanstack/react-query";

export interface WorkOrdersWorkerPaginationQueries
  extends IPaginationQueries {
  search?: string;
  status: "ONGOING" | "REQUEST" | "HISTORY";
}

export interface WorkOrders_Extension extends WorkOrders {
  order: {
    orderNumber: string;
  };
}

const useGetWorkOrdersWorker = (
  queries: WorkOrdersWorkerPaginationQueries,
) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["work_orders", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<
        IPageableResponse<WorkOrders_Extension>
      >("/work-orders/workers", {
        params: queries,
      });
      return data;
    },
  });
};

export default useGetWorkOrdersWorker;
