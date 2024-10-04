"use client";

import DashboardHeader from "@/components/DashboardHeader";
import { DataTable } from "@/components/DataTable";
import useGetOrdersOutlet from "@/hooks/api/order/useGetOrdersOutlet";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { outletOrdersColumns } from "./components/OutletOrdersColumns";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/Pagination";

const DashboardOutletOrdersPage = () => {
  const session = useSession();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const onChangePage = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  let { data, isPending, refetch } = useGetOrdersOutlet({
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

  return session.data.user.role === "OUTLET_ADMIN" ? (
    <>
      <DashboardHeader />
      <div className="text-md md: mx-auto h-full bg-white p-4 pt-24">
        {isPending ? (
          <div>Data fetching</div>
        ) : data?.data ? (
          <DataTable
            columns={outletOrdersColumns}
            data={data.data}
            meta={data.meta}
          />
        ) : (
          <DataTable
            columns={outletOrdersColumns}
            data={[]}
            meta={{ page: 1, take: 8, total: 0 }}
          />
        )}
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            // onClick={() => table.previousPage()}
            // disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            // onClick={() => table.nextPage()}
            // disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
        <div className="flex justify-center">
          <Pagination
            total={data?.meta?.total || 0}
            limit={data?.meta?.take || 0}
            onChangePage={onChangePage}
            page={page}
          />
        </div>
      </div>
    </>
  ) : (
    <>{router.push("/dashboard")}</>
  );
};

export default DashboardOutletOrdersPage;
