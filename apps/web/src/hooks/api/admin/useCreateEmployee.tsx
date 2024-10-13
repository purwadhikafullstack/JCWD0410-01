"use client";

import useAxios from "@/hooks/useAxios";
import { Role } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface CreateEmployeePayload {
  profilePicture?: File | string;
  name: string;
  phoneNumber: string;
  email: string;
  role: Role | string;
  stationId?: string;
  outletId: string;
  password: string;
}

const useCreateEmployee = () => {
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: CreateEmployeePayload) => {
      const createEmployeeForm = new FormData();

      createEmployeeForm.append("name", payload.name);
      createEmployeeForm.append("phoneNumber", payload.phoneNumber);
      createEmployeeForm.append("email", payload.email);
      createEmployeeForm.append("password", payload.password);
      createEmployeeForm.append("role", payload.role);
      createEmployeeForm.append("outletId", payload.outletId);

      if (payload.profilePicture) {
        createEmployeeForm.append("profilePicture", payload.profilePicture);
      }

      if (payload.stationId) {
        createEmployeeForm.append("stationId", payload.stationId);
      }

      const { data } = await axiosInstance.post(`/admin`, createEmployeeForm);

      return data;
    },
    onSuccess: async () => {
      toast.success("Create Employee Success");
      router.push(`/dashboard/users/employees`);
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useCreateEmployee;
