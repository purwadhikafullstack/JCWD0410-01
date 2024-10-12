"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface ProcessPaymentPayload {
  orderId: number;
}

const useProcessPayment = () => {
  const { axiosInstance } = useAxios();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: ProcessPaymentPayload) => {
      const { data } = await axiosInstance.post("/payments/process", payload);
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

export default useProcessPayment;
