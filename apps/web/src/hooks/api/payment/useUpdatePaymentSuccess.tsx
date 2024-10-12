"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface UpdatePaymentSuccessPayload {
  invoice: string;
}

const useUpdatePaymentSuccess = () => {
  const { axiosInstance } = useAxios();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: UpdatePaymentSuccessPayload) => {
      const { data } = await axiosInstance.patch("/payments/success", payload);
      return data;
    },
    onSuccess: () => {
      toast.success("Processing");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useUpdatePaymentSuccess;
