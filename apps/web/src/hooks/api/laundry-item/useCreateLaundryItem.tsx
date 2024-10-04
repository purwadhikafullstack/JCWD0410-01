"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface CreateLaundryItemPayload {
  name: string;
}

const useCreateLaundryItem = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateLaundryItemPayload) => {
      const { data } = await axiosInstance.post("/laundry-items", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["laundryItems"] });
      toast.success("Item telah berhasil ditambahkan");
      router.push("/dashboard/laundry-item");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useCreateLaundryItem;
