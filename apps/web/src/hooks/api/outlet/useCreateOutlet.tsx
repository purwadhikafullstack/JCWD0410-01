"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface CreateOutletPayload {
  name: string;
  type: string;
  address: string;
  latitude: string;
  longitude: string;
}

const useCreateOutlet = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateOutletPayload) => {
      const { data } = await axiosInstance.post("/outlets", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outlets"] });
      toast.success("Data outlet telah berhasil ditambahkan");
      router.push("/dashboard/outlet");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useCreateOutlet;
