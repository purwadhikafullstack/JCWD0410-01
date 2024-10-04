"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface updateLaundryItemPayload {
  name: string;
}

const useUpdateLaundryItem = (laundryItemId: number) => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: updateLaundryItemPayload) => {
      const { data } = await axiosInstance.patch(
        `/laundry-items/update-item/${laundryItemId}`,
        payload,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["laundryItems"],
      });
      router.push("/dashboard/laundry-item");
      toast.success("Item telah diperbaharui");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useUpdateLaundryItem;
