import useAxios from "@/hooks/useAxios";
import { Outlet } from "@/types/outlet";

import { useQuery } from "@tanstack/react-query";

const useGetOutlets = () => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["outlets"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Outlet[]>(`/outlets`);
      return data;
    },
  });
};

export default useGetOutlets;
