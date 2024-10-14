"use client";

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
import {
  GetUsersQuery,
  UserWithAddress,
} from "@/hooks/api/admin/useGetCustomers";
import { IPageableResponse } from "@/types/pagination";
import { Role } from "@/types/user";
import { UseQueryResult } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { FC, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { userColumns } from "./UserColumns";

interface UserTableInterface {
  callback: (
    queries: GetUsersQuery,
  ) => UseQueryResult<IPageableResponse<UserWithAddress>, Error>;
}

const UserTable: FC<UserTableInterface> = ({ callback }) => {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [isVerified, setIsVerified] = useState("");
  const [role, setRole] = useState<Role | undefined>(undefined);
  const pathname = usePathname();
  const [debouncedSearch] = useDebounceValue(searchValue, 500)

  const onChangePage = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  const { data, isPending, refetch } = callback({
    page,
    take: 8,
    sortBy: "name",
    sortOrder: "asc",
    search: debouncedSearch,
    isVerified,
    role,
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

  return (
    <>
      <div className="flex flex-col gap-2 md:flex-row mb-4">
        <div className="text-sm">
          <input
            className="focus:border-color1 block w-full rounded-md border-[1px] border-neutral-300 py-[9px] pl-3 pr-3 shadow-sm placeholder:text-sm placeholder:text-black focus:bg-white focus:outline-none sm:w-[200px] sm:text-sm"
            placeholder="Search value"
            type="text"
            name="search"
            value={searchValue}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {pathname === "/dashboard/users/customers" ? null : (
            <Select onValueChange={handleSelectRole} defaultValue={role || undefined}>
              <SelectTrigger className="sm:w-[200px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Role</SelectLabel>
                  <SelectItem value="ALL">All Employees</SelectItem>
                  <SelectItem value="OUTLET_ADMIN">Outlet Admin</SelectItem>
                  <SelectItem value="DRIVER">Driver</SelectItem>
                  <SelectItem value="WORKER">Worker</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
          <Select onValueChange={handleSelectIsVerified}>
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
          </Select>
        </div>
      </div>
      {isPending ? (
        <Loader2 className="mx-auto animate-spin" />
      ) : data?.data ? (
        <>
          <DataTable
            columns={userColumns}
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
          columns={userColumns}
          data={[]}
          meta={{ page: 1, take: 8, total: 0 }}
        />
      )}
    </>
  );
};

export default UserTable;
