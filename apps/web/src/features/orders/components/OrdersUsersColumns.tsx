"use client";

import { Button } from "@/components/ui/button";
import { GetOrders } from "@/hooks/api/order/useGetOrders";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

export const ordersUsersColumns: ColumnDef<GetOrders>[] = [

  {
    accessorKey: "orderNumber",
    header: "Order Number",
  },
  {
    accessorKey: "orderStatus",
    header: "Order Status",
  },
  {
    accessorKey: "total",
    header: "Total fee",
    cell: ({ row }) => {
      const result = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      });
      if (row.original.orderStatus === "WAITING_FOR_PICKUP_DRIVER" || row.original.orderStatus === "PICKUP_ON_THE_WAY_TO_CUSTOMER" || row.original.orderStatus === "PICKUP_ON_THE_WAY_TO_OUTLET" || row.original.orderStatus === "ARRIVED_AT_OUTLET") {
        return <div>Enroute</div>
      } else return <div>{result.format(row.original.total)}</div>;
    },
  },
  {
    accessorKey: "isPaid",
    header: "Payment",
    cell: ({ row }) => {
      const router = useRouter()
      return (
        <div className="m-auto">
          {row.original.isPaid ? (
            <Button className="flex items-center text-white bg-green-500 w-20" onClick={()=>{router.push(`/orders/${Number(row.original.id)}`)}}>
              {/* <IoMdCheckmarkCircle className="mr-1" /> */}
               Paid
            </Button>
          ) : (
            <Button className="flex items-center text-white bg-red-500 w-20" onClick={()=>{router.push(`/orders/${Number(row.original.id)}`)}}>
              {/* <IoMdCheckmarkCircle className="mr-1" />  */}
              Unpaid
            </Button>
          )}
        </div>
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
];
