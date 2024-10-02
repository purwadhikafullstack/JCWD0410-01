import useAxios from "@/hooks/useAxios";
import { User } from "@/types/user";
import { IPageableResponse, IPaginationQueries,  } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";
import { Address } from "@/types/address";

export interface GetUsersQuery extends IPaginationQueries {
  search?: string;
}

export interface UserWithAddress extends User {
  address: Address[];
}

const useGetEmployees = (queries: GetUsersQuery) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["users", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<IPageableResponse<UserWithAddress>>(
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