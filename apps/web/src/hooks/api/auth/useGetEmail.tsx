import useAxios from "@/hooks/useAxios";

import { useQuery } from "@tanstack/react-query";
interface Data {
  message: string;
  email: string;
}
const useGetEmail = (token: string) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["email", token],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Data>("/auth/get-email-token", {
        headers: { Authorization: `Bearer ${token}` },
      });

      return data;
    },
  });
};

export default useGetEmail;
