"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface CreateAddressPayload {
  name: string;
  address: string;
  city: string;
  district: string;
  latitude: string;
  longitude: string;
}

const useCreateAddress = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: CreateAddressPayload) => {
      const { data } = await axiosInstance.post("/addresses", payload);
      return data;
    },
    onSuccess: () => {
      toast.success("Create Address success");
      router.push("/address");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useCreateAddress;
