"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useAxios from "@/hooks/useAxios";
import { getSession, signIn } from "next-auth/react";

interface UpdateProfilePayload {
  profilePicture: File | string;
  name: string;
  phoneNumber: string;
}

const useUpdateProfile = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateProfilePayload) => {
      const updateProfileForm = new FormData();

      updateProfileForm.append("profilePicture", payload.profilePicture);
      updateProfileForm.append("name", payload.name);
      updateProfileForm.append("phoneNumber", payload.phoneNumber);

      // Sending payload as JSON directly
      const { data } = await axiosInstance.patch(
        `/users/update-profile`,
        updateProfileForm,
      );

      return data;
    },
    onSuccess: async (data) => {
      // await signIn("credentials", { ...data, redirect: false });
      // await getSession();
      toast.success("Update Profile Success");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      // router.push(`/profile/${userId}`);
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useUpdateProfile;
