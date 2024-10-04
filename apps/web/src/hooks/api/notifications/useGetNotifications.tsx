'use client'

import useAxios from "@/hooks/useAxios";
import { Notification } from "@/types/notification";
import { IPageableResponse, IPaginationQueries } from "@/types/pagination";
import { User_Notification } from "@/types/user-notification";
import { useQuery } from "@tanstack/react-query";

export interface NotificationsPaginationQueries extends IPaginationQueries {
  search?: string;
  unRead?: string;
}

export interface GetNotifications extends User_Notification {
  notification: Notification;
}

const useGetNotifications = (queries: NotificationsPaginationQueries) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["user_notifications", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<
        IPageableResponse<GetNotifications>
      >("/notifications/", {
        params: queries,
      });
      return data;
    },
  });
};

export default useGetNotifications;
