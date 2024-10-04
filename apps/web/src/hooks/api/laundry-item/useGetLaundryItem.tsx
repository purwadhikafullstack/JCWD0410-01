import useAxios from "@/hooks/useAxios";
import { LaundryItem } from "@/types/laundryItem";
import { useQuery } from "@tanstack/react-query";

const useGetLaundryItem = (laundryItemId: number) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["laundryItem", laundryItemId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<LaundryItem>(
        `/laundry-items/${laundryItemId}`,
      );
      return data;
    },
  });
};

export default useGetLaundryItem;
