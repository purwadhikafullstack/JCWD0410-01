"use client";

import { DataTable } from "@/components/DataTable";
import Pagination from "@/components/Pagination";
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
import useGetOrdersUsers from "@/hooks/api/order/useGetOrdersUser";
import { orderStatus, OrderStatus } from "@/types/order";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDebounceValue, useMediaQuery } from "usehooks-ts";
import OrderCard from "../dashboard/orders/components/OrdersCard";
import { ordersUsersColumns } from "./components/OrdersUsersColumns";

const OrdersUsersPage = () => {
  const session = useSession();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch] = useDebounceValue(searchValue, 500);
  const isDesktop = useMediaQuery("(min-width: 768px)", {
    initializeWithValue: false,
  });

  const queryParams = useSearchParams();

  const [searchParams, setSearchParams] = useState({
    page: Number(queryParams.get("page")) || 1,
    sortBy: queryParams.get("sortBy") || "createdAt",
    sortOrder: (queryParams.get("sortOrder") as "asc" | "desc") || "desc",
    search: queryParams.get("search") || "",
    status: (queryParams.get("status") as OrderStatus | "ALL") || "ALL",
  });

  const { data, isPending, refetch } = useGetOrdersUsers({
    page: searchParams.page,
    take: 8,
    sortBy: searchParams.sortBy,
    sortOrder: searchParams.sortOrder,
    search: searchParams.search,
    status: searchParams.status,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const onChangePage = ({ selected }: { selected: number }) => {
    setSearchParams({ ...searchParams, page: selected + 1 });
  };

  const handleSelectStatus = (value: OrderStatus | "ALL") => {
    setSearchParams({ ...searchParams, status: value });
  };

  const handleSortOrder = (value: "asc" | "desc") => {
    setSearchParams({ ...searchParams, sortOrder: value });
  };

  const handleSortBy = (value: string) => {
    setSearchParams({ ...searchParams, sortBy: value });
  };

  useEffect(() => {
    setSearchParams({ ...searchParams, search: debouncedSearch });
  }, [debouncedSearch]);

  useEffect(() => {
    const query = new URLSearchParams({
      ...searchParams,
      page: String(searchParams.page),
    }).toString();

    router.push(`/orders?${query}`);
    refetch();
  }, [searchParams]);

  if (!session.data) {
    return <div></div>;
  }

  return (
    <>
      <div className="text-md md: mx-auto h-full max-w-7xl bg-white px-4 py-10">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Orders</CardTitle>
            <CardDescription>List of orders</CardDescription>
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
              <Select onValueChange={handleSelectStatus} defaultValue="ALL">
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="ALL">ALL</SelectItem>
                    {orderStatus.map((status, index) => {
                      return (
                        <SelectItem value={status} key={index}>
                          {status}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {isPending ? (
              <Loader2 className="mx-auto animate-spin" />
            ) : data?.data ? (
              isDesktop ? (
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
                      page={searchParams.page}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col gap-4">
                    {data.data.map((order) => {
                      return (
                        <Link href={`/orders/${order.id}`}>
                          <OrderCard
                            key={order.id}
                            orderNumber={order.orderNumber}
                            orderStatus={order.orderStatus}
                            totalFee={order.total}
                            paymentStatus={order.isPaid}
                            outlet={order.outlet.name}
                            timeOfOrder={order.createdAt}
                            action={() => {}}
                          />
                        </Link>
                      );
                    })}
                  </div>
                  <div className="my-4 flex justify-center">
                    <Pagination
                      total={data?.meta?.total || 0}
                      limit={data?.meta?.take || 0}
                      onChangePage={onChangePage}
                      page={searchParams.page}
                    />
                  </div>
                </>
              )
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
