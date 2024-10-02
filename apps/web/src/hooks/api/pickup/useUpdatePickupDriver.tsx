"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface StatusPayload {
  id: number;
  status: 'ACCEPT' | 'CANCEL';
}

const useUpdatePickupDriver = () => {
  const { axiosInstance } = useAxios();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: StatusPayload) => {
      const { data } = await axiosInstance.patch(`/pickup-orders/drivers`, payload);
      return data;
    },
    onSuccess: async (data) => {
      toast.success("Pickup Order Updated");
      router.refresh();
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useUpdatePickupDriver;
