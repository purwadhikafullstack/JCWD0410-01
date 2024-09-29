"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface CompleteRegistrationPayload {
  name: string;
  password: string;
}

const useCompleteRegistration = (token: string) => {
  const router = useRouter();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: CompleteRegistrationPayload) => {
      const { data } = await axiosInstance.patch(
        `/auth/register/complete-registration/`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      return data;
    },
    onSuccess: () => {
      toast.success("Registrasi selesai, silahkan lanjut login ke akun anda ");
      router.replace("/login");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useCompleteRegistration;
