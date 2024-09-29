"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const useSetPrimaryAddress = () => {
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (addressId: string) => {
      const { data } = await axiosInstance.patch(
        `/addresses/set-primary-address/${addressId}`,
      );
      return data;
    },
    onSuccess: async () => {
      toast.success("Alamat utama telah diperbaharui");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useSetPrimaryAddress;
