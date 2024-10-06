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
import useGetEmployees from "@/hooks/api/admin/useGetEmployees";
import { Role } from "@/types/user";
import { debounce } from "lodash";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import useGetPickupOrdersDrivers from "@/hooks/api/pickup/useGetPickupOrdersDrivers";
import { pickupOrderColumns } from "../components/PickupOrderColumns";
import { pickupOrdersDriversColumns } from "./components/PickupOrdersDriversColumns";

const DashboardPickupOrdersDriversPage = () => {
  const session = useSession();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [isVerified, setIsVerified] = useState("");
  const [status, setStatus] = useState<"ONGOING" | "REQUEST" | "HISTORY">(
    "REQUEST",
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = useState("pickupNumber");
  const [outletId, setOutletId] = useState(0);

  const onChangePage = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  const { data, isPending, refetch } = useGetPickupOrdersDrivers({
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

  const handleSelectStatus = (value: "ONGOING" | "REQUEST" | "HISTORY") => {
    setStatus(value);
  };

  const handleSortOrder = (value: "asc" | "desc") => {
    setSortOrder(value);
  };

  const handleSortBy = (value: string) => {
    setSortBy(value);
  };

  return (
    <>
      <DashboardHeader />
      <div className="text-md md: mx-auto h-full bg-white p-4 pt-24">
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
                <SelectItem value="pickupNumber">Pickup Number</SelectItem>
                <SelectItem value="createdAt">Time of order</SelectItem>
                <SelectItem value="status">Action</SelectItem>
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
                <SelectItem value="REQUEST">Requesting Pickup</SelectItem>
                <SelectItem value="ONGOING">Ongoing Pickup</SelectItem>
                <SelectItem value="HISTORY">History</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* <Select onValueChange={handleOutletId}>
              <SelectTrigger className="md:w-[200px]">
                <SelectValue placeholder="Outlet" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Outlet</SelectLabel>
                  <SelectItem value="0">All</SelectItem>
                  <SelectItem value="1">not yet</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select> */}
        </div>
        {isPending ? (
          <Loader2 className="mx-auto animate-spin" />
        ) : data?.data ? (
          <>
            <DataTable
              columns={pickupOrdersDriversColumns}
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
            columns={pickupOrdersDriversColumns}
            data={[]}
            meta={{ page: 1, take: 8, total: 0 }}
          />
        )}
      </div>
    </>
  );
};
export default DashboardPickupOrdersDriversPage;
