"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface updateOutletPayload {
  name: string;
  type: string;
  latitude: string;
  longitude: string;
}

const useUpdateOutlet = (outletId: string) => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: updateOutletPayload) => {
      const { data } = await axiosInstance.patch(
        `/outlets/update-outlet/${outletId}`,
        payload,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outlets"] });
      router.push("/dashboard/outlet");
      toast.success("Data outlet telah diperbaharui");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useUpdateOutlet;
