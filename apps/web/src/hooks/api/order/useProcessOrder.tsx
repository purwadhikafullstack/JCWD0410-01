"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface ProcessOrderPayload {
  weight: number;
  orderId: number;
  orderItems: {
    name: string;
    itemQuantity: number;
    laundryItemId: number;
  }[];
}

const useProcessOrder = () => {
  const { axiosInstance } = useAxios();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: ProcessOrderPayload) => {
      const { data } = await axiosInstance.patch(`/orders`, payload);
      return data;
    },
    onSuccess: async (data) => {
      toast.success("Order processed");
      router.push("/dashboard/orders");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useProcessOrder;
