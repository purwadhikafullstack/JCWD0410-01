import useAxios from "@/hooks/useAxios";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

const useGetCustomers = (userId: number) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["users", userId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<User>(`/users/${userId}`);
      return data;
    },
  });
};

export default useGetCustomers;
