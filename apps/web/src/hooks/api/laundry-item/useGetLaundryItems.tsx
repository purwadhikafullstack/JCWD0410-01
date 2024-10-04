import useAxios from "@/hooks/useAxios";
import { LaundryItem } from "@/types/laundryItem";
import { IPageableResponse, IPaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

const useGetLaundryItems = (queries: IPaginationQueries) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["laundryItems", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<IPageableResponse<LaundryItem>>(
        `/laundry-items`,
        {
          params: queries,
        },
      );
      return data;
    },
  });
};

export default useGetLaundryItems;
