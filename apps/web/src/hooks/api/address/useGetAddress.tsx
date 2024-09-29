import useAxios from "@/hooks/useAxios";
import { Address } from "@/types/address";
import { useQuery } from "@tanstack/react-query";

const useGetAddress = (addressId: string) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["address", addressId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Address>(
        `/addresses/${addressId}`,
      );
      return data;
    },
  });
};

export default useGetAddress;
