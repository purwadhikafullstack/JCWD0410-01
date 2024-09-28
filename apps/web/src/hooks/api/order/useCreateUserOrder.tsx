"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
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

  return useMutation({
    mutationFn: async (payload: CreateUserOrderPayload) => {
      const { data } = await axiosInstance.post("/order/create-user-order", payload);
      return data;
    },
    onSuccess: () => {
      toast.success("Create user order success");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useCreateUserOrder;
