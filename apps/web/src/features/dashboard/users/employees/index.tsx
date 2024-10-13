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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { employeesColumns } from "../components/EmployeesColumns";
import { employeesOutletAdminColumns } from "../components/EmployeesOutletAdminColumns";
import UsersHeader from "../components/UsersHeader";

const DashboardUsersEmployeesPage = () => {
  const session = useSession();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [isVerified, setIsVerified] = useState("");
  const [role, setRole] = useState<Role | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = useState("name");
  const [outletId, setOutletId] = useState(0);
  const [debouncedSearch] = useDebounceValue(searchValue, 300);

  const onChangePage = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  const { data, isPending, refetch } = useGetEmployees({
    page,
    take: 8,
    sortBy,
    sortOrder,
    search: debouncedSearch,
    isVerified,
    role,
    outletId,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSelectIsVerified = (value: string) => {
    if (value === "ALL") {
      return setIsVerified("");
    }
    setIsVerified(value);
  };

  const handleSelectRole = (value: Role | "ALL") => {
    if (value === "ALL") {
      return setRole(undefined);
    }
    setRole(value);
  };

  const handleSortOrder = (value: "asc" | "desc") => {
    setSortOrder(value);
  };

  const handleSortBy = (value: string) => {
    setSortBy(value);
  };

  const handleOutletId = (value: string) => {
    setOutletId(Number(value));
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
                defaultValue={role || undefined}
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
              <Select onValueChange={handleOutletId}>
                <SelectTrigger>
                  <SelectValue placeholder="Outlet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Outlet</SelectLabel>
                    <SelectItem value="0">All</SelectItem>
                    <SelectItem value="1">not yet</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
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
                      page={page}
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
                      page={page}
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
