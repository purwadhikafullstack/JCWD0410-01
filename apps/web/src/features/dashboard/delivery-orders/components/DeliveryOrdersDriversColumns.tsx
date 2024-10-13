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
import { Delivery_Order_Extension } from "@/hooks/api/delivery/useGetDeliveryOrdersDrivers";
import useUpdateDeliveryDriver from "@/hooks/api/delivery/useUpdateDeliveryDriver";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { IoMdCheckmarkCircle } from "react-icons/io";

export const deliveryOrdersDriversColumns: ColumnDef<Delivery_Order_Extension>[] =
  [
    {
      accessorKey: "deliveryNumber",
      header: "Delivery Number",
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
    {
      accessorKey: "requestAction",
      header: "Action",
      cell: ({ row }) => {
        const { mutateAsync } = useUpdateDeliveryDriver();
        if (row.original.status === "ON_THE_WAY_TO_CUSTOMER") {
          return (
            <>
              <div>
                <AlertDialog>
                  <AlertDialogTrigger>
                    <span className="flex cursor-pointer items-center text-green-500">
                      <IoMdCheckmarkCircle className="mr-1" /> Finish deliver
                    </span>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Finalize delivery?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Once confirmed, you can see the order in History tab.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          mutateAsync({
                            id: Number(row.original.id),
                            status: "FINISH",
                          });
                          window.location.reload();
                        }}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </>
          );
        } else if (row.original.status === "WAITING_FOR_DRIVER") {
          return (
            <div>
              <AlertDialog>
                <AlertDialogTrigger>
                  <span className="flex cursor-pointer items-center text-green-500">
                    <IoMdCheckmarkCircle className="mr-1" /> Claim deliver
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
                        window.location.reload();
                      }}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          );
        } else if (row.original.status === "ON_THE_WAY_TO_OUTLET") {
          return (
            <>
              <div>
                <AlertDialog>
                  <AlertDialogTrigger>
                    <span className="flex cursor-pointer items-center text-green-500">
                      <IoMdCheckmarkCircle className="mr-1" /> Picked up item
                    </span>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Continue action?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Once confirmed, you can still see the order in Ongoing
                        tab.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          mutateAsync({
                            id: Number(row.original.id),
                            status: "DELIVER",
                          });
                          window.location.reload();
                        }}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              <div>
                <AlertDialog>
                  <AlertDialogTrigger>
                    <span className="flex cursor-pointer items-center text-red-500">
                      <IoMdCheckmarkCircle className="mr-1" /> Cancel Request
                    </span>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Do you want to cancel this request?
                      </AlertDialogTitle>
                      <AlertDialogDescription></AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          mutateAsync({
                            id: Number(row.original.id),
                            status: "CANCEL",
                          });
                          window.location.reload();
                        }}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </>
          );
        }
      },
    },
  ];
