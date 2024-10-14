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
import useGetEmployees from "@/hooks/api/admin/useGetEmployees";
import { Role } from "@/types/user";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { employeesColumns } from "../components/EmployeesColumns";
import { employeesOutletAdminColumns } from "../components/EmployeesOutletAdminColumns";
import UsersHeader from "../components/UsersHeader";
import useGetOutlets from "@/hooks/api/outlet/useGetOutlets";

const DashboardUsersEmployeesPage = () => {
  const session = useSession();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const { data: outlets } = useGetOutlets({ take: 10 });
  const [debouncedSearch] = useDebounceValue(searchValue, 500);

  const queryParams = useSearchParams();

  const [searchParams, setSearchParams] = useState({
    page: Number(queryParams.get("page")) || 1,
    sortBy: queryParams.get("sortBy") || "createdAt",
    sortOrder: (queryParams.get("sortOrder") as "asc" | "desc") || "desc",
    search: queryParams.get("search") || "",
    isVerified: queryParams.get("isVerified") || "",
    role: (queryParams.get("role") as Role | undefined) || undefined,
    outletId: queryParams.get("outletId") || "",
  });

  const { data, isPending, refetch } = useGetEmployees({
    page: searchParams.page,
    take: 8,
    sortBy: searchParams.sortBy,
    sortOrder: searchParams.sortOrder,
    search: searchParams.search,
    isVerified: searchParams.isVerified,
    role: searchParams.role,
    outletId: Number(searchParams.outletId),
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

  const handleSelectRole = (value: Role | "ALL") => {
    if (value === "ALL") {
      setSearchParams({ ...searchParams, role: undefined });
    } else {
      setSearchParams({ ...searchParams, role: value });
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
      role: searchParams.role || "",
    }).toString();

    router.push(`/dashboard/users/employees?${query}`);
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

  return session.data?.user.role === "ADMIN" ||
    session.data?.user.role === "OUTLET_ADMIN" ? (
    <>
      <DashboardHeader />
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Users</CardTitle>
          <CardDescription>List of users</CardDescription>
        </CardHeader>
        <CardContent>
          <UsersHeader />
          <div className="text-md md: mx-auto h-full p-6">
            <div className="mb-4 grid grid-cols-1 justify-between gap-4 md:grid-cols-5">
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
              <Select
                onValueChange={handleSelectRole}
                defaultValue={searchParams.role || undefined}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Role</SelectLabel>
                    <SelectItem value="ALL">All Employees</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="OUTLET_ADMIN">Outlet Admin</SelectItem>
                    <SelectItem value="DRIVER">Driver</SelectItem>
                    <SelectItem value="WORKER">Worker</SelectItem>
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
              session.data.user.role === "ADMIN" ? (
                <>
                  <DataTable
                    columns={employeesColumns}
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
                  <DataTable
                    columns={employeesOutletAdminColumns}
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
              )
            ) : (
              <DataTable
                columns={employeesColumns}
                data={[]}
                meta={{ page: 1, take: 8, total: 0 }}
              />
            )}
          </div>
        </CardContent>
      </Card>
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

export default DashboardUsersEmployeesPage;
