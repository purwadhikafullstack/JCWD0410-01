"use client";

import useAxios from "@/hooks/useAxios";
import { Address } from "@/types/address";
import { useQuery } from "@tanstack/react-query";

const useGetAddresses = () => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["addresses"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Address[]>("/addresses");
      return data;
    },
  });
};

export default useGetAddresses;
