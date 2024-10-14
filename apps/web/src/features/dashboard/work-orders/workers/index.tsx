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
import useGetWorkOrdersWorker from "@/hooks/api/work/useGetWorkOrdersWorker";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounceValue, useMediaQuery } from "usehooks-ts";
import { workOrderWorkerColumns } from "../components/WorkOrdersWorkerColumns";
import WorkOrderCardWorker from "../components/WorkOrderCardWorker";

const DashboardWorkOrdersWorkerPage = () => {
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
    status: (queryParams.get("status") as 'ONGOING' | 'HISTORY' | "REQUEST") || "REQUEST",
  });

  const { data, isPending, refetch } = useGetWorkOrdersWorker({
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

  const handleSelectStatus = (value: "ONGOING" | "HISTORY" | "REQUEST") => {
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

    router.push(`/dashboard/work-orders?${query}`);
    refetch();
  }, [searchParams]);

  return (
    <>
      <DashboardHeader />
      <div className="text-md md: mx-auto h-full bg-white p-4">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Work Orders</CardTitle>
            <CardDescription>List of work orders</CardDescription>
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
                    <SelectItem value="createdAt">Time of order</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
                    <SelectItem value="stationId">Station</SelectItem>
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
              <Select onValueChange={handleSelectStatus} defaultValue="REQUEST">
                <SelectTrigger className="md:w-[200px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="REQUEST">Ready for work</SelectItem>
                    <SelectItem value="ONGOING">Ongoing work</SelectItem>
                    <SelectItem value="HISTORY">History</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {isPending ? (
              <Loader2 className="mx-auto animate-spin" />
            ) : data?.data ? isDesktop ? (
              <>
                <DataTable
                  columns={workOrderWorkerColumns}
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
                      <WorkOrderCardWorker
                        key={order.id}
                        id={order.id}
                        orderNumber={order.order.orderNumber}
                        status={order.status}
                        timeOfOrder={order.createdAt}
                        stationId={order.stationId}
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
            ) : (
              <DataTable
                columns={workOrderWorkerColumns}
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
export default DashboardWorkOrdersWorkerPage;
