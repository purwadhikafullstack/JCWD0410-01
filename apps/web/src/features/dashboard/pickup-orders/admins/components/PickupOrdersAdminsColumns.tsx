"use client";

import { Pickup_Order_Extension } from "@/hooks/api/pickup/useGetPickupOrdersDrivers";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const pickupOrdersAdminsColumns: ColumnDef<Pickup_Order_Extension>[] = [
  {
    accessorKey: "pickupNumber",
    header: "Pickup Number",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = String(row.original.status);
      if (status === "WAITING_FOR_DRIVER") {
        return <div className="line-clamp-2 max-w-[20ch] break-all">Waiting for driver</div>
      } else if (status === "RECEIVED_BY_OUTLET") {
        return <div className="line-clamp-2 max-w-[20ch] break-all">Arrived at outlet</div>
      } else {
        return <div className="line-clamp-2 max-w-[20ch] break-all">Ongoing</div>
      }
    },
  },
  {
    accessorKey: "user.name",
    header: "Customer",
  },
  {
    accessorKey: "address.address",
    header: "Customer Address",
    cell: ({ row }) => {
      const address = String(row.original.address.address);
      return (
        <div className="line-clamp-2 max-w-[20ch] break-all">{address}</div>
      );
    },
  },
  {
    accessorKey: "outlet.name",
    header: "Outlet",
  },
  {
    accessorKey: "createdAt",
    header: "Time of order",
    cell: ({ row }) => {
      const createdAt = format(
        new Date(row.getValue("createdAt")),
        "dd MMM yyyy, HH:mm:ss",
      );
      return <div>{createdAt}</div>;
    },
  },
  // {
  //   accessorKey: "updatedAt",
  //   header: "Last updated",
  //   cell: ({ row }) => {
  //     const updatedAt = format(
  //       new Date(row.getValue("updatedAt")),
  //       "dd MMM yyyy, HH:mm:ss",
  //     );
  //     return <div>{updatedAt}</div>;
  //   },
  // },
];
