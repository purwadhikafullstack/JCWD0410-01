import useAxios from "@/hooks/useAxios";
import { Address } from "@/types/address";
import { IPageableResponse, IPaginationQueries, } from "@/types/pagination";
import { Role, User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

export interface GetUsersQuery extends IPaginationQueries {
  search?: string;
  isVerified?: string;
  role?: Role;
}

export interface UserWithAddress extends User {
  addresses: Address[];
}

const useGetCustomers = (queries: GetUsersQuery) => {
  const { axiosInstance } = useAxios();
  const pathname = usePathname();

  return useQuery({
    queryKey: ["users", queries, pathname],
    queryFn: async () => {
      const { data } = await axiosInstance.get<IPageableResponse<UserWithAddress>>(
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