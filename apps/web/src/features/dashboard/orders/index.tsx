"use client";

import DashboardHeader from "@/components/DashboardHeader";
import { DataTable } from "@/components/DataTable";
import useGetOrders from "@/hooks/api/order/useGetOrders";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ordersColumns } from "./components/OrdersColumns";

const DashboardOrdersPage = () => {
  const session = useSession();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  let { data, isPending, refetch } = useGetOrders({
    page,
    take: 8,
    sortBy: "createdAt",
    sortOrder: "desc",
    search: searchValue,
    status: "",
    outletId: 0,
  });

  if (!session.data) {
    return (
      <>
        <DashboardHeader />
        <div className="md: mx-auto h-full bg-white p-4 pt-24 text-xl font-bold"></div>
      </>
    );
  }

  return session.data?.user.role === "ADMIN" ? (
    <>
      <DashboardHeader />
      <div className="text-md md: mx-auto h-full bg-white p-4 pt-24">
        {isPending ? (
          <div>Data fetching</div>
        ) : data?.data ? (
          <DataTable columns={ordersColumns} data={data.data} meta={data.meta}/>
        ) : (
          <DataTable columns={ordersColumns} data={[]} meta={{page: 1, take: 8, total: 0}}/>
        )}
      </div>
    </>
  ) : (
    <>{router.push("/dashboard")}</>
  );
};

export default DashboardOrdersPage;
