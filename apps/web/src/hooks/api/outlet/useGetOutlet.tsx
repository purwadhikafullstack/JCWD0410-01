import useAxios from "@/hooks/useAxios";
import { Outlet } from "@/types/outlet";
import { useQuery } from "@tanstack/react-query";

const useGetOutlet = (outletId: string) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["outlet", outletId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Outlet>(`/outlets/${outletId}`);
      return data;
    },
  });
};

export default useGetOutlet;
