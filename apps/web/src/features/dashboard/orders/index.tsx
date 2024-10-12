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
import useGetOrders from "@/hooks/api/order/useGetOrders";
import useGetOutlets from "@/hooks/api/outlet/useGetOutlets";
import { orderStatus, OrderStatus } from "@/types/order";
import { debounce } from "lodash";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { ordersAdminsColumns } from "./components/OrdersAdminsColumns";
import OrderCard from "./components/OrdersCard";
import { useMediaQuery } from "usehooks-ts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const DashboardOrdersPage = () => {
  const session = useSession();
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 640px)", {
    initializeWithValue: false,
  });
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [status, setStatus] = useState<OrderStatus | "ALL">("ALL");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [sortBy, setSortBy] = useState("createdAt");
  const [outletId, setOutletId] = useState("");

  const { data: outlets } = useGetOutlets({ take: 10 });

  const onChangePage = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  const { data, isPending, refetch } = useGetOrders({
    page,
    take: 8,
    sortBy: sortBy,
    sortOrder: sortOrder,
    search: searchValue,
    status,
    outletId,
  });

  console.log(data);

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

  const handleOutletId = (value: string) => {
    setOutletId(value);
    if (value === "0") {
      setOutletId("");
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
        <div className="text-md md: mx-auto h-full px-6">
          <div
            className={`mb-4 grid grid-cols-1 gap-4 ${session.data.user.role === "ADMIN" ? `md:grid-cols-5` : "md:grid-cols-4"}`}
          >
            <div className="mb-2 text-sm">
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
                  {orderStatus.map((status) => {
                    return <SelectItem value={status}>{status}</SelectItem>;
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
                    {outlets?.data.map((outlet) => {
                      return (
                        <SelectItem value={String(outlet.id)}>
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
                      page={page}
                    />
                  </div>
                </>
              ) : (
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
              )}
              {/* <DataTable
                columns={ordersAdminsColumns}
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
              </div> */}
            </>
          ) : (
            <DataTable
              columns={ordersAdminsColumns}
              data={[]}
              meta={{ page: 1, take: 8, total: 0 }}
            />
          )}
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
