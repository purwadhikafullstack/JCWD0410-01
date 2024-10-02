'use client'

import { DataTable } from "@/components/DataTable";
import { Pickup_Order_Extension, PickupOrdersDriversPaginationQueries } from "@/hooks/api/pickup/useGetPickupOrdersDrivers";
import { IPageableResponse } from "@/types/pagination";
import { UseQueryResult } from "@tanstack/react-query";
import { FC, useState } from "react";
import { pickupOrderColumns } from "./PickupOrderColumns";
import { ColumnDef } from "@tanstack/react-table";
import { pickupOrderRequestColumns } from "../request/components/PickupOrderRequestColumns";
import { pickupOrderOngoingColumns } from "../ongoing/components/PickupOrderOngoingColumns";

interface PickupOrderTableInterface {
  status: 'ONGOING' | 'REQUEST' | 'HISTORY',
  callback: (queries: PickupOrdersDriversPaginationQueries) => UseQueryResult<IPageableResponse<Pickup_Order_Extension>, Error>
}

const PickupOrderTable: FC<PickupOrderTableInterface> = ({status, callback}) => {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const { data, isPending } = callback({
    page,
    take: 8,
    sortBy: "pickupNumber",
    sortOrder: "desc",
    search: searchValue,
    status
  });

  let columns = pickupOrderColumns;

  if (status === "ONGOING") {
    columns = pickupOrderOngoingColumns;
  }

  if (status === "REQUEST") {
    columns = pickupOrderRequestColumns;
  }

  if (status === "HISTORY") {
    columns = pickupOrderColumns;
  }

  return (
    <>
      {isPending ? <div>Data fetching</div> : (
        // data?.data ?
        <DataTable columns={columns} data={data?.data!} />
        //  : <DataTable columns={pickupOrderColumns} data={[]} />
      )}
    </>
  );
};

export default PickupOrderTable;
