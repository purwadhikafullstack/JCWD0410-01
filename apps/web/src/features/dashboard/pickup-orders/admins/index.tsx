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
import useGetPickupOrdersAdmins from "@/hooks/api/pickup/useGetPickupOrdersAdmins";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounceValue, useMediaQuery } from "usehooks-ts";
import PickupOrderCard from "../components/PickupOrderCard";
import { pickupOrdersAdminsColumns } from "./components/PickupOrdersAdminsColumns";
import PickupOrderCardUser from "@/components/PickupOrderCardUser";

const DashboardPickupOrdersAdminsPage = () => {
  const session = useSession();
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 768px)", {
    initializeWithValue: false,
  });
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch] = useDebounceValue(searchValue, 500);

  const { data: outlets } = useGetOutlets({ take: 10 });

  const queryParams = useSearchParams();

  const [searchParams, setSearchParams] = useState({
    page: Number(queryParams.get("page")) || 1,
    sortBy: queryParams.get("sortBy") || "createdAt",
    sortOrder: (queryParams.get("sortOrder") as "asc" | "desc") || "desc",
    search: queryParams.get("search") || "",
    status:
      (queryParams.get("status") as
        | "ONGOING"
        | "HISTORY"
        | "REQUEST"
        | "ALL") || "ALL",
    outletId: queryParams.get("outletId") || "",
  });

  const { data, isPending, refetch } = useGetPickupOrdersAdmins({
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

  const handleSelectStatus = (
    value: "ONGOING" | "HISTORY" | "REQUEST" | "ALL",
  ) => {
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

    router.push(`/dashboard/pickup-orders?${query}`);
    refetch();
  }, [searchParams]);

  const handleOutletId = (value: string) => {
    if (value === "0") {
      setSearchParams({ ...searchParams, outletId: "" });
    } else {
      setSearchParams({ ...searchParams, outletId: value });
    }
  };

  return (
    <>
      <DashboardHeader />
      <div className="text-md md: h-ful mx-auto px-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Pickup Orders</CardTitle>
            <CardDescription>List of pickup orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-5">
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
                    <SelectItem value="pickupNumber">Pickup Number</SelectItem>
                    <SelectItem value="createdAt">Time of order</SelectItem>
                    <SelectItem value="updatedAt">Last Updated</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
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
                    <SelectItem value="REQUEST">Requesting Pickup</SelectItem>
                    <SelectItem value="ONGOING">Ongoing Pickup</SelectItem>
                    <SelectItem value="HISTORY">History</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {session.data?.user.role === "ADMIN" ? (
                <Select onValueChange={handleOutletId}>
                  <SelectTrigger>
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
                      columns={pickupOrdersAdminsColumns}
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
                          <PickupOrderCardUser
                            key={order.id}
                            pickupNumber={order.pickupNumber}
                            status={order.status}
                            customer={order.user.name}
                            customerAddress={order.address.address}
                            outlet={order.outlet.name}
                            timeOfOrder={order.createdAt}
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
                columns={pickupOrdersAdminsColumns}
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
export default DashboardPickupOrdersAdminsPage;
