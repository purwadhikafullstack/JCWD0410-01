"use client";

import { UserWithAddress } from "@/hooks/api/admin/useGetCustomers";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { FaCircleXmark } from "react-icons/fa6";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Pickup_Order_Extension } from "@/hooks/api/pickup/useGetPickupOrdersDrivers";
import { format } from "date-fns";
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
import useUpdatePickupDriver from "@/hooks/api/pickup/useUpdatePickupDriver";

export const pickupOrderOngoingColumns: ColumnDef<Pickup_Order_Extension>[] = [
  // {
  //   accessorKey: "profilePicture",
  //   header: "Profile",
  // cell: ({ row }) => {
  //   const src = row.getValue("profilePicture")
  //     ? String(row.getValue("profilePicture"))
  //     : "";
  //   return (
  //     <div className="relative h-10 w-10 overflow-hidden rounded-full border-[1px] border-neutral-200">
  //       <Image
  //         src={src}
  //         alt="profile"
  //         fill
  //         className="absolute inset-0 h-full w-full object-cover"
  //       />
  //     </div>
  //   );
  // },
  // },
  // {
  //   accessorKey: "role",
  //   header: "Role",
  // },
  // {
  //   accessorKey: "name",
  //   header: "Name",
  // },
  // {
  //   accessorKey: "email",
  //   header: "Email",
  // },
  // {
  //   accessorKey: "phoneNumber",
  //   header: "Number",
  // },
  // {
  //   accessorKey: "isVerified",
  //   header: "Verification",
  //   cell: ({ row }) => {
  //     const verified = row.getValue<boolean>("isVerified");
  //     return verified ? (
  //       <span className="flex items-center text-green-500">
  //         <IoMdCheckmarkCircle className="mr-1" /> Verified
  //       </span>
  //     ) : (
  //       <span className="flex items-center text-red-500">
  //         <FaCircleXmark className="mr-1" /> Unverified
  //       </span>
  //     );
  //   },
  // },
  // const formattedEndDate = format(
  //   new Date(card.endDate),
  //   "MMM dd, yyyy, HH:mm:ss",
  // );
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
        <div className="line-clamp-2 max-w-[20ch] break-words">{address}</div>
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
    accessorKey: "requestAction",
    header: "Confirm",
    cell: ({ row }) => {
      const { mutateAsync } = useUpdatePickupDriver();

      return (
        <div>
          <AlertDialog>
            <AlertDialogTrigger>
              <span className="flex cursor-pointer items-center text-red-500">
                <IoMdCheckmarkCircle className="mr-1" /> Cancel Request
              </span>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Do you want to cancel this request?</AlertDialogTitle>
                <AlertDialogDescription>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={()=>{mutateAsync({id: Number(row.original.id), status: "CANCEL"})}}>Continue</AlertDialogAction>
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
