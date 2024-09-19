import useAxios from "@/hooks/useAxios";
import { User } from "@/types/user";
import { IPageableResponse, IPaginationQueries,  } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface GetCustomersQuery extends IPaginationQueries {
  search?: string;
}

const useGetCustomers = (queries: GetCustomersQuery) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["users", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<IPageableResponse<User>>(
        "/admin/customers",
        {
          params: queries,
        },
      );
      return data;
    },
  });
};

export default useGetCustomers;