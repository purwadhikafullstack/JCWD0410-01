"use client";

import DashboardHeader from "@/components/DashboardHeader";
import { DataTable } from "@/components/DataTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetNotifications from "@/hooks/api/notifications/useGetNotifications";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { notificationsColumns } from "./components/NotificationsColumns";
import Pagination from "@/components/Pagination";
import NotificationHeader from "./components/NotificationHeaders";

const DashboardNotificationPage = () => {
  const session = useSession();
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [sortBy, setSortBy] = useState("createdAt");
  const [debouncedSearch] = useDebounceValue(searchValue, 300);

  const onChangePage = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSortOrder = (value: "asc" | "desc") => {
    setSortOrder(value);
  };

  const handleSortBy = (value: string) => {
    setSortBy(value);
  };

  const pathname = usePathname();

  const { data, isPending, refetch } = useGetNotifications({
    page,
    take: 8,
    sortBy,
    sortOrder,
    search: debouncedSearch,
    unRead: "",
  });
  const pt = pathname === "/notifications" ? "" : "pt-24";
  if (!session.data) {
    return <div></div>;
  }
  return (
    <>
      <NotificationHeader />
      <div className="text-md md: mx-auto h-full bg-white p-4 pt-24">
        Notif
        <>
          {isPending ? (
            <div>Data fetching</div>
          ) : data?.data ? (
            <DataTable
              columns={notificationsColumns}
              data={data.data}
              meta={data.meta}
            />
          ) : (
            <DataTable
              columns={notificationsColumns}
              data={[]}
              meta={{ page: 1, take: 8, total: 0 }}
            />
          )}
        </>
      </div>
    </>
  );
};

export default DashboardNotificationPage;
