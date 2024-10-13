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
import useGetOutlets from "@/hooks/api/outlet/useGetOutlets";
import useGetWorkOrdersAdmins from "@/hooks/api/work/useGetWorkOrdersAdmins";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { workOrderAdminsColumns } from "../components/WorkOrdersAdminsColumns";

const DashboardWorkOrdersAdminsPage = () => {
  const session = useSession();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [isVerified, setIsVerified] = useState("");
  const [status, setStatus] = useState<"ONGOING" | "REQUEST" | "HISTORY" | "ALL">(
    "ALL",
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [sortBy, setSortBy] = useState("createdAt");
  const [outletId, setOutletId] = useState("");
  const { data: outlets } = useGetOutlets({ take: 10 });
  const [debouncedSearch] = useDebounceValue(searchValue, 300)


  const onChangePage = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  const { data, isPending, refetch } = useGetWorkOrdersAdmins({
    page,
    take: 8,
    sortBy: sortBy,
    sortOrder: sortOrder,
    search: debouncedSearch,
    status,
    outletId,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSelectStatus = (value: "ONGOING" | "REQUEST" | "HISTORY" | "ALL") => {
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
              <Select onValueChange={handleSelectStatus} defaultValue="ALL">
                <SelectTrigger className="md:w-[200px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="ALL">All</SelectItem>
                    <SelectItem value="REQUEST">Ready for work</SelectItem>
                    <SelectItem value="ONGOING">Ongoing work</SelectItem>
                    <SelectItem value="HISTORY">History</SelectItem>
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
                            <SelectItem value={String(outlet.id)} key={outlet.id}>
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
                <DataTable
                  columns={workOrderAdminsColumns}
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
                columns={workOrderAdminsColumns}
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
export default DashboardWorkOrdersAdminsPage;
