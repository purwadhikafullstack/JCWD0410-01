"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface updateAddressPayload {
  name: string;
  address: string;
  city: string;
  district: string;
  latitude: string;
  longitude: string;
}

const useUpdateAddress = (addressId: number) => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: updateAddressPayload) => {
      const { data } = await axiosInstance.patch(
        `/addresses/update-address/${addressId}`,
        payload,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      router.push("/address");
      toast.success("Alamat telah diperbaharui");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useUpdateAddress;
