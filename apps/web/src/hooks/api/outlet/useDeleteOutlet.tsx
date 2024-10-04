"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const useDeleteOutlet = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (outletId: number) => {
      const { data } = await axiosInstance.patch(
        `/outlets/delete-outlet/${outletId}`,
      );
      return data;
    },
    onSuccess: async () => {
      toast.success("Outlet telah dihapus");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useDeleteOutlet;
