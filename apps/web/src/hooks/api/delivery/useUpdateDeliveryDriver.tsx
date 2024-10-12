"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface StatusPayload {
  id: number;
  status: 'ACCEPT' | 'CANCEL' | 'FINISH' | 'DELIVER';
}

const useUpdateDeliveryDriver = () => {
  const { axiosInstance } = useAxios();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: StatusPayload) => {
      const { data } = await axiosInstance.patch(`/delivery-orders/drivers`, payload);
      return data;
    },
    onSuccess: async (data) => {
      toast.success("Delivery Order Updated");
      router.refresh();
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useUpdateDeliveryDriver;
