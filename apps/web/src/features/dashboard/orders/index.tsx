"use client";

import DashboardHeader from "@/components/DashboardHeader";
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
import useGetOrders from "@/hooks/api/order/useGetOrders";
import useGetOutlets from "@/hooks/api/outlet/useGetOutlets";
import { orderStatus, OrderStatus } from "@/types/order";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDebounceValue, useMediaQuery } from "usehooks-ts";
import { ordersAdminsColumns } from "./components/OrdersAdminsColumns";
import OrderCard from "./components/OrdersCard";

const DashboardOrdersPage = () => {
  const session = useSession();
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 768px)", {
    initializeWithValue: false,
  });
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch] = useDebounceValue(searchValue, 500);

  const { data: outlets } = useGetOutlets({ take: 12 });

  const queryParams = useSearchParams();

  const [searchParams, setSearchParams] = useState({
    page: Number(queryParams.get("page")) || 1,
    sortBy: queryParams.get("sortBy") || "createdAt",
    sortOrder: (queryParams.get("sortOrder") as "asc" | "desc") || "desc",
    search: queryParams.get("search") || "",
    status: (queryParams.get("status") as OrderStatus | "ALL") || "ALL",
    outletId: queryParams.get("outletId") || "",
  });

  const { data, isPending, refetch } = useGetOrders({
    page: searchParams.page,
    take: 8,
    sortBy: searchParams.sortBy,
    sortOrder: searchParams.sortOrder,
    search: searchParams.search,
    status: searchParams.status,
    outletId: searchParams.outletId,
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

    router.push(`/dashboard/orders?${query}`);
    refetch();
  }, [searchParams]);

  const handleOutletId = (value: string) => {
    if (value === "0") {
      setSearchParams({ ...searchParams, outletId: "" });
    } else {
      setSearchParams({ ...searchParams, outletId: value });
    }
  };

  if (!session.data) {
    return <DashboardHeader />;
  }

  if (
    session.data.user.role === "ADMIN" ||
    session.data.user.role === "OUTLET_ADMIN"
  ) {
    return (
      <>
        <DashboardHeader />
        <div className="px-6">
            <div className="flex h-16 items-center justify-between rounded-md bg-[#e5f3f6] p-4 shadow">
              <h3 className="text-xl font-semibold text-[#37bae3]">Orders</h3>
            </div>
          </div>
        <div className="text-md md: mx-auto h-full p-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">List of orders</CardTitle>
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
              <div
                className={`mb-4 grid grid-cols-1 gap-4 ${session.data.user.role === "ADMIN" ? `md:grid-cols-4` : "md:grid-cols-3"}`}
              >
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
                {session.data?.user.role === "ADMIN" ? (
                  <Select onValueChange={handleOutletId}>
                    <SelectTrigger className="md:w-[200px]">
                      <SelectValue placeholder="Outlet" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Outlet</SelectLabel>
                        <SelectItem value="0">ALL</SelectItem>
                        {outlets?.data.map((outlet, index) => {
                          return (
                            <SelectItem value={String(outlet.id)} key={index}>
                              {outlet.name}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                ) : null}
              </div>
              {isPending ? (
                <Loader2 className="mx-auto animate-spin" />
              ) : data?.data ? (
                <>
                  {isDesktop ? (
                    <>
                      <DataTable
                        columns={ordersAdminsColumns}
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
                  )}
                </>
              ) : (
                <DataTable
                  columns={ordersAdminsColumns}
                  data={[]}
                  meta={{ page: 1, take: 8, total: 0 }}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </>
    );
  } else {
    return (
      <>
        <nav className="fixed z-50 h-20 w-full content-center bg-blue-200 p-3 md:w-[calc(100%-256px)]"></nav>
        <div className="md: mx-auto h-full bg-white p-4 pt-24 text-xl font-bold">
          <>{router.push("/dashboard")}</>
        </div>
      </>
    );
  }
};

export default DashboardOrdersPage;
