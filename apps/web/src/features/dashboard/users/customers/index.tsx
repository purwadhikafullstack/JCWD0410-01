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
import useGetCustomers from "@/hooks/api/admin/useGetCustomers";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { customersColumns } from "../components/CustomersColumns";
import UsersHeader from "../components/UsersHeader";

const DashboardUsersCustomersPage = () => {
  const session = useSession();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch] = useDebounceValue(searchValue, 500);

  const queryParams = useSearchParams();

  const [searchParams, setSearchParams] = useState({
    page: Number(queryParams.get("page")) || 1,
    sortBy: queryParams.get("sortBy") || "createdAt",
    sortOrder: (queryParams.get("sortOrder") as "asc" | "desc") || "desc",
    search: queryParams.get("search") || "",
    isVerified: queryParams.get("isVerified") || "",
  });

  const { data, isPending, refetch } = useGetCustomers({
    page: searchParams.page,
    take: 8,
    sortBy: searchParams.sortBy,
    sortOrder: searchParams.sortOrder,
    search: searchParams.search,
    isVerified: searchParams.isVerified,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const onChangePage = ({ selected }: { selected: number }) => {
    setSearchParams({ ...searchParams, page: selected + 1 });
  };

  const handleSelectIsVerified = (value: string) => {
    if (value === "ALL") {
      setSearchParams({ ...searchParams, isVerified: "" });
    } else {
      setSearchParams({ ...searchParams, isVerified: value });
    }
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

    router.push(`/dashboard/users/customers?${query}`);
    refetch();
  }, [searchParams]);

  if (!session.data) {
    return <DashboardHeader />;
  }

  return session.data?.user.role === "ADMIN" ? (
    <>
      <DashboardHeader />
      <div className="px-6">
        <div className="flex h-16 items-center justify-between rounded-md bg-[#e5f3f6] p-4 shadow">
          <h3 className="text-xl font-semibold text-[#37bae3]">Customers</h3>
        </div>
      </div>
      <div className="text-md md: mx-auto h-full bg-white p-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Users</CardTitle>
            <CardDescription>List of users</CardDescription>
          </CardHeader>
          <CardContent>
              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
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
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="phoneNumber">Phone Number</SelectItem>
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
                <Select onValueChange={handleSelectIsVerified}>
                  <SelectTrigger>
                    <SelectValue placeholder="Verification" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="ALL">All Status</SelectItem>
                      <SelectItem value="VERIFIED">Verified</SelectItem>
                      <SelectItem value="UNVERIFIED">Unverified</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {isPending ? (
                <Loader2 className="mx-auto animate-spin" />
              ) : data?.data ? (
                <>
                  <DataTable
                    columns={customersColumns}
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
                <DataTable
                  columns={customersColumns}
                  data={[]}
                  meta={{ page: 1, take: 8, total: 0 }}
                />
              )}
          </CardContent>
        </Card>
      </div>
    </>
  ) : (
    <>
      <nav className="fixed z-50 h-20 w-full content-center bg-blue-200 p-3 md:w-[calc(100%-256px)]"></nav>
      <div className="md: mx-auto h-full bg-white p-4 pt-24 text-xl font-bold">
        <>{router.push("/dashboard")}</>
      </div>
    </>
  );
};

export default DashboardUsersCustomersPage;
