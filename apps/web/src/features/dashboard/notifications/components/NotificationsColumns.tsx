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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pickup_Order_Extension } from "@/hooks/api/pickup/useGetPickupOrdersDrivers";
import useUpdatePickupDriver from "@/hooks/api/pickup/useUpdatePickupDriver";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { IoMdCheckmarkCircle } from "react-icons/io";

export const notificationsColumns: ColumnDef<Pickup_Order_Extension>[] = [
  {
    accessorKey: "pickupNumber",
    header: "Pickup Number",
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
        <div className="line-clamp-3 max-w-[20ch] break-words">{address}</div>
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
        "dd MMMM yyyy, HH:mm:ss",
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
                <AlertDialogTitle>Do you want to accept this request?</AlertDialogTitle>
                <AlertDialogDescription>
                  Once confirmed, you can see the order in Ongoing tab.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={()=>{mutateAsync({id: Number(row.original.id), status: "ACCEPT"})}}>Continue</AlertDialogAction>
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
      const pickupOrder = row.original;

      return (
        <>
          {/* <Dialog.Root bind:open={myOpen}>
	<!-- ... dialog stuff here -->
</Dialog.Root> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              {pickupOrder.status === "WAITING_FOR_DRIVER" ? (
                <DropdownMenuItem
                  onClick={() =>
                    navigator.clipboard.writeText(pickupOrder.address.address)
                  }
                >
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <span className="flex cursor-pointer items-center text-blue-400">
                        Accept Request
                      </span>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuItem>
              ) : null}
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(pickupOrder.address.address)
                }
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={`/dashboard/users/${pickupOrder.id}`}>
                  View user
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
