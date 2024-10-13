"use client";

import { Pickup_Order_User_Extension } from "@/hooks/api/pickup/useGetPickupUser";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const pickupOrdersUsersColumns: ColumnDef<Pickup_Order_User_Extension>[] =
  [
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
          return (
            <div className="line-clamp-2 max-w-[20ch] break-all">
              Waiting for driver
            </div>
          );
        } else if (status === "RECEIVED_BY_OUTLET" || status === "ONSITE") {
          return (
            <div className="line-clamp-2 max-w-[20ch] break-all">
              Arrived at outlet
            </div>
          );
        } else {
          return (
            <div className="line-clamp-2 max-w-[20ch] break-all">Ongoing</div>
          );
        }
      },
    },
    {
      accessorKey: "employee.user.name",
      header: "Driver",
      cell: ({ row }) => {
        const driver = String(row.original.employee.user.name);
        return (
          <div className="line-clamp-2 max-w-[24ch]">{driver}</div>
        );
      },
    },
    {
      accessorKey: "employee.user.phoneNumber",
      header: "Driver phone",
      cell: ({ row }) => {
        return row.original.employee.user.phoneNumber ? (
          <div className="line-clamp-2 max-w-[20ch] break-all">
            {String(row.original.employee.user.phoneNumber)}
          </div>
        ) : (
          <div className="line-clamp-2 max-w-[20ch] break-all">
            No phone
          </div>
        );
      },
    },
    {
      accessorKey: "address",
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
      cell: ({ row }) => {
        const address = String(row.original.outlet.name);
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">{address}</div>
        );
      },
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
  ];
