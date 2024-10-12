"use client";

import DashboardHeader from "@/components/DashboardHeader";
import { DataTable } from "@/components/DataTable";
import Pagination from "@/components/Pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetOrdersUsers from "@/hooks/api/order/useGetOrdersUser";
import { orderStatus, OrderStatus } from "@/types/order";
import { debounce } from "lodash";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { ordersUsersColumns } from "./components/OrdersUsersColumns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const OrdersUsersPage = () => {
  const session = useSession();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [status, setStatus] = useState<OrderStatus | "ALL">("ALL");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [sortBy, setSortBy] = useState("createdAt");

  // const [outletId, setOutletId] = useState("");

  // const { data: outlets } = useGetOutlets({ take: 10 });

  const onChangePage = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  const { data, isPending, refetch } = useGetOrdersUsers({
    page,
    take: 8,
    sortBy: sortBy,
    sortOrder: sortOrder,
    search: searchValue,
    status,
  });

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        setSearchValue(value);
      }, 300),
    [setSearchValue],
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  };

  const handleSelectStatus = (value: OrderStatus | "ALL") => {
    setStatus(value);
  };

  const handleSortOrder = (value: "asc" | "desc") => {
    setSortOrder(value);
  };

  const handleSortBy = (value: string) => {
    setSortBy(value);
  };

  // const handleOutletId = (value: string) => {
  //   setOutletId(value);
  //   if (value === "0") {
  //     setOutletId("");
  //   }
  // };

  if (!session.data) {
    return <div></div>;
  }

  return (
    <>
      <div className="text-md md: mx-auto h-full bg-white p-4">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Orders</CardTitle>
            <CardDescription>List of orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-2 text-sm">
              <input
                className="focus:border-color1 block w-full rounded-md border-[1px] border-neutral-300 py-[9px] pl-3 pr-3 shadow-sm placeholder:text-sm placeholder:text-black focus:bg-white focus:outline-none md:w-[200px] md:text-sm"
                placeholder="Search value"
                type="text"
                name="search"
                value={searchValue}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4 flex flex-col gap-2 md:flex-row">
              <Select onValueChange={handleSortBy}>
                <SelectTrigger className="md:w-[200px]">
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
                <SelectTrigger className="md:w-[200px]">
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
              <Select onValueChange={handleSelectStatus} defaultValue="ALL">
                <SelectTrigger className="md:w-[200px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="ALL">ALL</SelectItem>
                    {orderStatus.map((status) => {
                      return <SelectItem value={status}>{status}</SelectItem>;
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {isPending ? (
              <Loader2 className="mx-auto animate-spin" />
            ) : data?.data ? (
              <>
                <DataTable
                  columns={ordersUsersColumns}
                  data={data?.data!}
                  meta={data.meta}
                />
                <div className="my-4 flex justify-center">
                  <Pagination
                    total={data?.meta?.total || 0}
                    limit={data?.meta?.take || 0}
                    onChangePage={onChangePage}
                    page={page}
                  />
                </div>
              </>
            ) : (
              <DataTable
                columns={ordersUsersColumns}
                data={[]}
                meta={{ page: 1, take: 8, total: 0 }}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default OrdersUsersPage;
