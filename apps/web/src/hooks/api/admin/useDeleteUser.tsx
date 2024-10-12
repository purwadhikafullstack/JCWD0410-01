"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const useDeleteUser = () => {
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosInstance.patch(
        `/admin/delete`, {id}
      );
      return data;
    },
    onSuccess: async () => {
      toast.success("User deleted");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useDeleteUser;
