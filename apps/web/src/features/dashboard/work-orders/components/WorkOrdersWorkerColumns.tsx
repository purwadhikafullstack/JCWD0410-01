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
import { WorkOrders_Extension } from "@/hooks/api/work/useGetWorkOrdersWorker";

export const workOrderWorkerColumns: ColumnDef<WorkOrders_Extension>[] = [
  {
    accessorKey: "order.orderNumber",
    header: "Order Number",
  },
  {
    accessorKey: "stationId",
    header: "Station",
    cell: ({ row }) => {
      const station = Number(row.original.stationId);
      if (station === 1) {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">Washing</div>
        );
      } else if (station === 2) {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">Ironing</div>
        );
      } else if (station === 3) {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">Packing</div>
        );
      }
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = String(row.original.status);
      if (status === "READY_FOR_WASHING") {
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
            Washing complete
          </div>
        );
      } else if (status === "READY_FOR_IRONING") {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">
            Ready for Ironing
          </div>
        );
      } else if (status === "BEING_IRONED") {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">Ironing</div>
        );
      } else if (status === "IRONING_COMPLETED") {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">
            Ironing complete
          </div>
        );
      } else if (status === "READY_FOR_PACKING") {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">
            Ready for packing
          </div>
        );
      } else if (status === "BEING_PACKED") {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">Packing</div>
        );
      } else if (status === "PACKING_COMPLETED") {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">
            Packing complete
          </div>
        );
      } else if (status === "BYPASSED") {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">Bypassed</div>
        );
      } else return <div></div>;
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
  {
    accessorKey: "requestAction",
    header: "Action",
    cell: ({ row }) => {
      const { mutateAsync } = useUpdatePickupDriver();
      const status = String(row.original.status);
      if (status === "READY_FOR_WASHING") {
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
            Washing complete
          </div>
        );
      } else if (status === "READY_FOR_IRONING") {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">
            Ready for Ironing
          </div>
        );
      } else if (status === "BEING_IRONED") {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">Ironing</div>
        );
      } else if (status === "IRONING_COMPLETED") {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">
            Ironing complete
          </div>
        );
      } else if (status === "READY_FOR_PACKING") {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">
            Ready for packing
          </div>
        );
      } else if (status === "BEING_PACKED") {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">Packing</div>
        );
      } else if (status === "PACKING_COMPLETED") {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">
            Packing complete
          </div>
        );
      } else if (status === "BYPASSED") {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">Bypassed</div>
        );
      } else return <div></div>;
    },
  },
  //   {
  //     id: "actions",
  //     cell: ({ row }) => {
  //       const pickupOrder = row.original;

  //       return (
  //         <>
  //           {/* <Dialog.Root bind:open={myOpen}>
  // 	<!-- ... dialog stuff here -->
  // </Dialog.Root> */}
  //           <DropdownMenu>
  //             <DropdownMenuTrigger asChild>
  //               <Button variant="ghost" className="h-8 w-8 p-0">
  //                 <span className="sr-only">Open menu</span>
  //                 <MoreHorizontal className="h-4 w-4" />
  //               </Button>
  //             </DropdownMenuTrigger>
  //             <DropdownMenuContent align="end">
  //               <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //               {pickupOrder.status === "WAITING_FOR_DRIVER" ? (
  //                 <DropdownMenuItem
  //                   onClick={() =>
  //                     navigator.clipboard.writeText(pickupOrder.address.address)
  //                   }
  //                 >
  //                   <AlertDialog>
  //                     <AlertDialogTrigger>
  //                       <span className="flex cursor-pointer items-center text-blue-400">
  //                         Accept Request
  //                       </span>
  //                     </AlertDialogTrigger>
  //                     <AlertDialogContent>
  //                       <AlertDialogHeader>
  //                         <AlertDialogTitle>
  //                           Are you absolutely sure?
  //                         </AlertDialogTitle>
  //                         <AlertDialogDescription>
  //                           This action cannot be undone. This will permanently
  //                           delete your account and remove your data from our
  //                           servers.
  //                         </AlertDialogDescription>
  //                       </AlertDialogHeader>
  //                       <AlertDialogFooter>
  //                         <AlertDialogCancel>Cancel</AlertDialogCancel>
  //                         <AlertDialogAction>Continue</AlertDialogAction>
  //                       </AlertDialogFooter>
  //                     </AlertDialogContent>
  //                   </AlertDialog>
  //                 </DropdownMenuItem>
  //               ) : null}
  //               <DropdownMenuItem
  //                 onClick={() =>
  //                   navigator.clipboard.writeText(pickupOrder.address.address)
  //                 }
  //               >
  //                 Copy payment ID
  //               </DropdownMenuItem>
  //               <DropdownMenuSeparator />
  //               <DropdownMenuItem>
  //                 <Link href={`/dashboard/users/${pickupOrder.id}`}>
  //                   View user
  //                 </Link>
  //               </DropdownMenuItem>
  //               <DropdownMenuItem>View payment details</DropdownMenuItem>
  //             </DropdownMenuContent>
  //           </DropdownMenu>
  //         </>
  //       );
  //     },
  //   },
];
