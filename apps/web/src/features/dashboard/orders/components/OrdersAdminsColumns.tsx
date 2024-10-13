"use client";

import { GetOrders } from "@/hooks/api/order/useGetOrders";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";

export const ordersAdminsColumns: ColumnDef<GetOrders>[] = [
  {
    accessorKey: "orderNumber",
    header: "Order Number",
  },
  {
    accessorKey: "orderStatus",
    header: "Order Status",
    cell: ({ row }) => {
      const status = String(row.original.orderStatus);
      if (status === "WAITING_FOR_PICKUP_DRIVER") {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">
            Waiting for pickup driver
          </div>
        );
      } else if (status === "PICKUP_ON_THE_WAY_TO_CUSTOMER") {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">
            Pickup on the way to customer
          </div>
        );
      } else if (status === "PICKUP_ON_THE_WAY_TO_OUTLET") {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">
            Pickup on the way to outlet
          </div>
        );
      } else if (status === "ARRIVED_AT_OUTLET") {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">
            Arrived at outlet
          </div>
        );
      } else if (status === "READY_FOR_WASHING") {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">
            Ready for washing
          </div>
        );
      } else if (status === "BEING_WASHED") {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">Washing</div>
        );
      } else if (status === "WASHING_COMPLETED") {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">
            Washing completed
          </div>
        );
      } else if (status === "BEING_IRONED") {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">Ironing</div>
        );
      } else if (status === "IRONING_COMPLETED") {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">
            Ironing completed
          </div>
        );
      } else if (status === "BEING_PACKED") {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">Packing</div>
        );
      } else if (status === "AWAITING_PAYMENT") {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">
            Awaiting payment
          </div>
        );
      } else if (status === "READY_FOR_DELIVERY") {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">
            Ready for delivery
          </div>
        );
      } else if (status === "WAITING_FOR_DELIVERY_DRIVER") {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">
            Awaiting delivery driver
          </div>
        );
      } else if (status === "BEING_DELIVERED_TO_CUSTOMER") {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">
            Delivering to customer
          </div>
        );
      } else if (status === "RECEIVED_BY_CUSTOMER") {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">
            Laundry delivered
          </div>
        );
      } else return <div></div>;
    },
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
      if (
        row.original.orderStatus === "WAITING_FOR_PICKUP_DRIVER" ||
        row.original.orderStatus === "PICKUP_ON_THE_WAY_TO_CUSTOMER" ||
        row.original.orderStatus === "PICKUP_ON_THE_WAY_TO_OUTLET" ||
        row.original.orderStatus === "ARRIVED_AT_OUTLET"
      ) {
        return <div>Enroute</div>;
      } else return <div>{result.format(row.original.total)}</div>;
    },
  },
  {
    accessorKey: "isPaid",
    header: "Payment",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.isPaid ? (
            <span className="flex items-center text-green-500">Paid</span>
          ) : (
            <span className="flex items-center text-red-500">Unpaid</span>
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
  {
    accessorKey: "process",
    header: "Process",
    cell: ({ row }) => {
      if (row.original.orderStatus === "ARRIVED_AT_OUTLET") {
        return <Link href={`/dashboard/orders/${row.original.id}`} className="text-blue-400">Process</Link>;
      } else if (
        row.original.orderStatus === "WAITING_FOR_PICKUP_DRIVER" ||
        row.original.orderStatus === "PICKUP_ON_THE_WAY_TO_CUSTOMER" ||
        row.original.orderStatus === "PICKUP_ON_THE_WAY_TO_OUTLET"
      ) {
        return <div>On the way</div>;
      } else {
        return <div>Processed</div>
      }
    },
  },
];
