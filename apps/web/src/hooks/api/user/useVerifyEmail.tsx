"use client";

import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface ChangeEmailPayload {
  email: string;
  token: string;
}

const useVerifyEmail = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: ChangeEmailPayload) => {
      const { data } = await axiosInstance.patch(
        `/users/verify-email`,
        { email: payload.email },
        {
          headers: {
            Authorization: `Bearer ${payload.token}`,
          },
        },
      );
      return data;
    },
    onSuccess: async () => {
      toast.success(
        "Please check your inbox to verify your new email address.",
      );
      router.push(`/`);
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useVerifyEmail;
