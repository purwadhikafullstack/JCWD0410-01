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
import { GetOrders } from "@/hooks/api/order/useGetOrders";
import { useRouter } from "next/navigation";

export const ordersAdminsColumns: ColumnDef<GetOrders>[] = [
  // const formattedEndDate = format(
  //   new Date(card.endDate),
  //   "MMM dd, yyyy, HH:mm:ss",
  // );
  {
    accessorKey: "orderNumber",
    header: "Order Number",
  },
  // {
  //   accessorKey: "address.address",
  //   header: "Customer Address",
  //   cell: ({ row }) => {
  //     const address = String(row.original.address.address);
  //     return (
  //       <div className="line-clamp-2 max-w-[20ch] break-all">{address}</div>
  //     );
  //   },
  // },
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
            <span className="flex items-center text-green-500">
              {/* <IoMdCheckmarkCircle className="mr-1" /> */}
              Paid
            </span>
          ) : (
            <span className="flex items-center text-red-500">
              {/* <IoMdCheckmarkCircle className="mr-1" />  */}
              Unpaid
            </span>
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
    accessorKey: "requestAction",
    header: "Action",
    cell: ({ row }) => {
      // const { mutateAsync } = useUpdatePickupDriver();
      const router = useRouter();
      if (row.original.orderStatus === "ARRIVED_AT_OUTLET") {
        return (
          <div>
            <AlertDialog>
              <AlertDialogTrigger>
                <span className="flex cursor-pointer items-center text-green-500">
                  <IoMdCheckmarkCircle className="mr-1" /> Process order
                </span>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Process order?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Click continue to head to process page.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      router.push(`/dashboard/orders/${row.original.id}`);
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      }
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
