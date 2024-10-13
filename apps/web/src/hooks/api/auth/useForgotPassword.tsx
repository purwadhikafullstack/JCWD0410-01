"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface ForgotPasswordPayload {
  email: string;
}

const useForgotPassword = () => {
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: ForgotPasswordPayload) => {
      const { data } = await axiosInstance.post(
        "/auth/forgot-password",
        payload,
      );
      return data;
    },
    onSuccess: async (data) => {
      toast.success(
        "Email berhasil dikirim, silakan periksa kotak masuk Anda.",
      );
      //
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useForgotPassword;
