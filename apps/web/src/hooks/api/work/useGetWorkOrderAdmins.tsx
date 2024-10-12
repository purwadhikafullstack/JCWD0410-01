import useAxios from "@/hooks/useAxios";
import { WorkOrders } from "@/types/work-order";
import { useQuery } from "@tanstack/react-query";

const useGetWorkOrderAdmins = (id: number) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["work-orders"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<WorkOrders>(`/work-orders/${id}`);
      return data;
    },
  });
};

export default useGetWorkOrderAdmins;
