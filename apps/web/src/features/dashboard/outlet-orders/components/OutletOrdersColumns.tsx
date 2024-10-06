"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { GetNotifications } from "@/hooks/api/notifications/useGetNotifications";
import { GetOrders } from "@/hooks/api/order/useGetOrders";
import useUpdatePickupDriver from "@/hooks/api/pickup/useUpdatePickupDriver";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { IoMdCheckmarkCircle } from "react-icons/io";

export const outletOrdersColumns: ColumnDef<GetOrders>[] = [
  {
    accessorKey: "orderNumber",
    header: "Number",
  },
  {
    accessorKey: "orderStatus",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Order time",
    cell: ({ row }) => {
      const createdAt = format(
        new Date(row.getValue("createdAt")),
        "dd MMM yyyy, HH:mm:ss",
      );
      return <div>{createdAt}</div>;
    },
  },
  // {
  //   accessorKey: "address.address",
  //   header: "Customer Address",
  //   cell: ({ row }) => {
  //     const address = String(row.original.address.address);
  //     return (
  //       <div className="line-clamp-2 max-w-[20ch] break-words">{address}</div>
  //     );
  //   },
  // },
  {
    accessorKey: "requestAction",
    header: "Confirm",
    cell: ({ row }) => {
      const { mutateAsync } = useUpdatePickupDriver();

      return (
        <div>
          <AlertDialog>
            <AlertDialogTrigger>
              <span className="flex cursor-pointer items-center hover:text-blue-500">
                <IoMdCheckmarkCircle className="mr-1" /> Accept Request
              </span>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Do you want to accept this request?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Once confirmed, you can see the order in Ongoing tab.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    mutateAsync({
                      id: Number(row.original.id),
                      status: "ACCEPT",
                    });
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <>
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(order.orderNumber)}
            >
              Copy order number
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/dashboard/orders/${order.orderNumber}`}>View order detail</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </>
      );
    },
  },
];
