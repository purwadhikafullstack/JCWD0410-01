import useAxios from "@/hooks/useAxios";
import { User } from "@/types/user";

import { useQuery } from "@tanstack/react-query";

interface GetEmployee extends User {
  employee: {
    outletId: string;
    employeeStations: {
      stationId: string;
    };
  };
}

const useGetEmployee = (userId: number) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<GetEmployee>(
        `/admin/employee/${userId}`,
      );
      return data;
    },
  });
};

export default useGetEmployee;
