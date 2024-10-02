"use client";

import { DataTable } from "@/components/DataTable";
import React, { FC, useState } from "react";
import { userColumns } from "./UserColumns";
import {
  GetUsersQuery,
  UserWithAddress,
} from "@/hooks/api/admin/useGetCustomers";
import { UseQueryResult } from "@tanstack/react-query";
import { IPageableResponse } from "@/types/pagination";
import { Loader2 } from "lucide-react";

interface UserTableInterface {
  callback: (
    queries: GetUsersQuery,
  ) => UseQueryResult<IPageableResponse<UserWithAddress>, Error>;
}

const UserTable: FC<UserTableInterface> = ({ callback }) => {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const { data, isPending } = callback({
    page,
    take: 8,
    sortBy: "name",
    sortOrder: "desc",
    search: searchValue,
  });
  return (
    <>
      {isPending ? (
        <Loader2 className="mx-auto animate-spin" />
      ) : data?.data ? (
        <DataTable columns={userColumns} data={data?.data!} />
      ) : (
        <DataTable columns={userColumns} data={[]} />
      )}
    </>
  );
};

export default UserTable;
