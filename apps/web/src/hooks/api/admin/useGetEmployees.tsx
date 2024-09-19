import useAxios from "@/hooks/useAxios";
import { User } from "@/types/user";
import { IPageableResponse, IPaginationQueries,  } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface GetEmployeesQuery extends IPaginationQueries {
  search?: string;
}

const useGetEmployees = (queries: GetEmployeesQuery) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["employees", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<IPageableResponse<User>>(
        "/admin/employees",
        {
          params: queries,
        },
      );
      return data;
    },
  });
};

export default useGetEmployees;