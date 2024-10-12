"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface CreateUserOrderPayload {
  pickupStatus: string; //string sementara, ganti jadi enum!
  pickupLatitude: string;
  pickupLongitude: string;
  pickupFee: number;
  pickupAddressId: number;
  pickupAddress: string;
  deliveryStatus: string; //string sementara, ganti jadi enum!
  deliveryLatitude: string;
  deliveryLongitude: string;
  deliveryFee: number;
  deliveryAddressId: number;
  outletId: number;
  outletName: string;
}

const useCreateUserOrder = () => {
  const { axiosInstance } = useAxios();
  const router = useRouter()

  return useMutation({
    mutationFn: async (payload: CreateUserOrderPayload) => {
      const { data } = await axiosInstance.post("/orders/create-user-order", payload);
      return data;
    },
    onSuccess: () => {
      router.push('/')
      toast.success("Create user order success");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useCreateUserOrder;
