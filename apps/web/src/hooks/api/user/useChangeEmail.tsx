"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface ChangeEmailPayload {
  email: string;
}

const useUpdateEmail = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: ChangeEmailPayload) => {
      const { data } = await axiosInstance.patch(
        `/users/update-email`,
        payload,
      );
      return data;
    },
    onSuccess: async () => {
      toast.success(
        "Please check your inbox to verify your new email address.",
      );
      // router.push(`/profile/${userId}`);
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useUpdateEmail;
