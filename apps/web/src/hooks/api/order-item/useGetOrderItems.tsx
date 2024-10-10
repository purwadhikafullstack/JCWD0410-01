import useAxios from "@/hooks/useAxios";
import { OrderItem } from "@/types/order-item";
import { IPageableResponse, IPaginationQueries } from "@/types/pagination";
import { WorkStatus } from "@/types/work-order";
import { useQuery } from "@tanstack/react-query";

interface GetOrderItemsQueries extends IPaginationQueries {
  workOrderId: string,
}

interface OrderItemWorkStatusExtension extends OrderItem {
  workOrderStatus: WorkStatus;
}

const useGetOrderItems = (queries: GetOrderItemsQueries) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["orderItems", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<IPageableResponse<OrderItemWorkStatusExtension>>(
        `/order-items/work-orders`,
        {
          params: queries,
        },
      );
      return data;
    },
  });
};

export default useGetOrderItems;
