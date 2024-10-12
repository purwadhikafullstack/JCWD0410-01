import useAxios from "@/hooks/useAxios";
import { Outlet } from "@/types/outlet";
import { IPageableResponse, IPaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface GetOutletsQuery extends IPaginationQueries {
  search?: string;
  category?: string;
  location?: string;
}

const useGetOutlets = (queries: GetOutletsQuery) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["outlets", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<IPageableResponse<Outlet>>(
        "/outlets",
        {
          params: queries,
        },
      );
      return data;
    },
  });
};

export default useGetOutlets;
