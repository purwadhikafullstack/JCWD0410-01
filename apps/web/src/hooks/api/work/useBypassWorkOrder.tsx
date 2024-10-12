"use client";

import useAxios from "@/hooks/useAxios";
import { WorkStatus } from "@/types/work-order";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface StatusPayload {
  id: number;
  bypassNote: string;
}

const useBypassWorkOrder = () => {
  const { axiosInstance } = useAxios();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: StatusPayload) => {
      const { data } = await axiosInstance.patch(`/work-orders/bypass`, payload);
      return data;
    },
    onSuccess: async (data) => {
      toast.success("Work Order Updated");
      router.push('/dashboard/work-orders');
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useBypassWorkOrder;
