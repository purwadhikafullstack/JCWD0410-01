import useAxios from "@/hooks/useAxios";
import { DeliveryStatus } from "@/types/delivery-order";
import { Order } from "@/types/order";
import { OrderItem } from "@/types/order-item";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

interface GetOrderUser extends Order {
  outlet: {
    name: string;
  };
  user: {
    email: string;
    name: string | null;
  };
  pickupOrders: {
    fee: number;
    pickupNumber: string;
  }[];
  deliveryOrders: {
    deliveryNumber: string;
    fee: number;
    status: DeliveryStatus;
  }[];
  orderItems: OrderItem[];
}

const useGetOrderUser = (id: number) => {
  const { axiosInstance } = useAxios();
  const pathname = usePathname();

  return useQuery({
    queryKey: ["work-orders", pathname],
    queryFn: async () => {
      const { data } = await axiosInstance.get<GetOrderUser>(`/orders/${id}`);
      return data;
    },
  });
};

export default useGetOrderUser;
