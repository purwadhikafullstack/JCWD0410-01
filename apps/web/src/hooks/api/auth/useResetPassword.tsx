"use client";

import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { toast } from "react-toastify";

const useResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const resetPassword = async (password: string, token: string) => {
    setIsLoading(true);
    try {
      await axiosInstance.patch(
        "/auth/reset-password",
        { password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success("Reset password success");

      //bedanya sama push nanti dia gak bisa back
      router.replace("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data || "Something wnt wrong!");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return { resetPassword, isLoading };
};

export default useResetPassword;
