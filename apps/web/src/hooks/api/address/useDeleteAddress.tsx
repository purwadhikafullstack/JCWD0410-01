"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const useDeleteAddress = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (addressId: string) => {
      const { data } = await axiosInstance.patch(
        `/addresses/delete-address/${addressId}`,
      );
      return data;
    },
    onSuccess: async () => {
      toast.success("Alamat telah dihapus");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useDeleteAddress;
