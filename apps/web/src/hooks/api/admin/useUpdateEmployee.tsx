import useAxios from "@/hooks/useAxios";
import { Role } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface UpdateEmployeePayload {
  profilePicture?: File | string;
  name?: string;
  phoneNumber?: string;
  email?: string;
  role?: Role | string;
  stationId?: string;
  outletId?: string;
  password?: string;
  oldPassword?: string;
}
const useUpdateEmployee = (userId: number) => {
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: UpdateEmployeePayload) => {
      const updateEmployeeForm = new FormData();

      if (payload.name !== undefined) {
        updateEmployeeForm.append("name", payload.name);
      }

      if (payload.phoneNumber !== undefined) {
        updateEmployeeForm.append("phoneNumber", payload.phoneNumber);
      }

      if (payload.email !== undefined) {
        updateEmployeeForm.append("email", payload.email);
      }

      if (payload.password !== undefined) {
        updateEmployeeForm.append("password", payload.password);
      }

      if (payload.oldPassword !== undefined) {
        updateEmployeeForm.append("oldPassword", payload.oldPassword);
      }

      if (payload.role !== undefined) {
        updateEmployeeForm.append("role", payload.role);
      }

      if (payload.outletId !== undefined) {
        updateEmployeeForm.append("outletId", payload.outletId);
      }

      if (payload.profilePicture) {
        updateEmployeeForm.append("profilePicture", payload.profilePicture);
      }

      if (payload.stationId) {
        updateEmployeeForm.append("stationId", payload.stationId);
      }

      const { data } = await axiosInstance.patch(
        `/admin/update/${userId}`,
        updateEmployeeForm,
      );

      return data;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Update Employee Success");
      router.push(`/dashboard/users/employees`);
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useUpdateEmployee;
