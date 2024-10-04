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
import { employeesColumns } from "../components/EmployeesColumns";
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

  const onChangePage = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  const { data, isPending, refetch } = useGetEmployees({
    page,
    take: 8,
    sortBy,
    sortOrder,
    search: searchValue,
    isVerified,
    role,
    outletId,
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
      <UsersHeader />
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
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phoneNumber">Phone Number</SelectItem>
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
          <Select
            onValueChange={handleSelectRole}
            defaultValue={role || undefined}
          >
            <SelectTrigger className="md:w-[200px]">
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
          </Select>
          {/* <Select onValueChange={handleSelectIsVerified}>
              <SelectTrigger className="sm:w-[200px]">
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
            </Select> */}
        </div>
        {isPending ? (
          <Loader2 className="mx-auto animate-spin" />
        ) : data?.data ? (
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
          <DataTable
            columns={employeesColumns}
            data={[]}
            meta={{ page: 1, take: 8, total: 0 }}
          />
        )}
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

export default DashboardUsersEmployeesPage;
