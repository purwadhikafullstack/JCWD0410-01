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
import { useDebounceValue, useMediaQuery } from "usehooks-ts";
import { notificationsColumns } from "./components/NotificationsColumns";
import Pagination from "@/components/Pagination";
import NotificationHeader from "./components/NotificationHeaders";
import NotificationCard from "./components/NotificationCard";

const DashboardNotificationPage = () => {
  const session = useSession();
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [sortBy, setSortBy] = useState("createdAt");
  const [debouncedSearch] = useDebounceValue(searchValue, 500);
  const isDesktop = useMediaQuery("(min-width: 768px)", {
    initializeWithValue: false,
  });

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
      {pathname === "/notifications" ? "" : <>
      <DashboardHeader />
      <div className="px-6">
            <div className="flex h-16 items-center justify-between rounded-md bg-[#e5f3f6] p-4 shadow">
              <h3 className="text-xl font-semibold text-[#37bae3]">Notifications</h3>
            </div>
          </div>
      </>
      }
      <div className={`text-md md: mx-auto h-full max-w-7xl bg-white p-6`}>
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Notifications</CardTitle>
            <CardDescription>List of notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
              <div className="text-sm">
                <input
                  className="focus:border-color1 block w-full rounded-md border-[1px] border-neutral-300 py-[9px] pl-3 pr-3 shadow-sm placeholder:text-sm placeholder:text-black focus:bg-white focus:outline-none md:text-sm"
                  placeholder="Search value"
                  type="text"
                  name="search"
                  value={searchValue}
                  onChange={handleInputChange}
                />
              </div>
              <Select onValueChange={handleSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sort by</SelectLabel>
                    <SelectItem value="orderNumber">Order Number</SelectItem>
                    <SelectItem value="createdAt">Time of order</SelectItem>
                    <SelectItem value="updatedAt">Last Updated</SelectItem>
                    <SelectItem value="orderStatus">Order Status</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select onValueChange={handleSortOrder}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort Order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sort order</SelectLabel>
                    <SelectItem value="asc">Ascending</SelectItem>
                    <SelectItem value="desc">Descending</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {isPending ? (
              <div>Data fetching</div>
            ) : data?.data ? (
              isDesktop ? (
                <DataTable
                  columns={notificationsColumns}
                  data={data.data}
                  meta={data.meta}
                />
              ) : (
                <>
                  <div className="flex flex-col gap-4">
                    {data.data.map((order) => {
                      return (
                        <NotificationCard
                          key={order.id}
                          title={order.notification.title}
                          message={order.notification.message}
                          timeOfOrder={order.createdAt}
                        />
                      );
                    })}
                  </div>
                </>
              )
            ) : (
              <DataTable
                columns={notificationsColumns}
                data={[]}
                meta={{ page: 1, take: 8, total: 0 }}
              />
            )}
            <div className="my-4 flex justify-center">
              <Pagination
                total={data?.meta?.total || 0}
                limit={data?.meta?.take || 0}
                onChangePage={onChangePage}
                page={page}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default DashboardNotificationPage;
