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
import { GetOrders } from "@/hooks/api/order/useGetOrders";
import useUpdatePickupDriver from "@/hooks/api/pickup/useUpdatePickupDriver";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { IoMdCheckmarkCircle } from "react-icons/io";

export const ordersColumns: ColumnDef<GetOrders>[] = [
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
];
