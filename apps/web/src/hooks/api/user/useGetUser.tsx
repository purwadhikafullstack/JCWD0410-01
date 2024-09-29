import useAxios from "@/hooks/useAxios";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

const useGetCustomers = () => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<User>(`/users`);
      return data;
    },
  });
};

export default useGetCustomers;
