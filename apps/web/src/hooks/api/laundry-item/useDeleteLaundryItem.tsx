"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const useDeleteLaundryItem = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (laundryItemId: number) => {
      const { data } = await axiosInstance.patch(
        `/laundry-items/delete-item/${laundryItemId}`,
      );
      return data;
    },
    onSuccess: async () => {
      toast.success("Item telah dihapus");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useDeleteLaundryItem;
