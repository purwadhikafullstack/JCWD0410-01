"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateAddressPayload) => {
      const { data } = await axiosInstance.post("/addresses", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("Alamat telah berhasil ditambahkan");
      router.push("/address");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useCreateAddress;
