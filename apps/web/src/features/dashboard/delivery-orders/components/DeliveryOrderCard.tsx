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
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import useUpdateDeliveryDriver from "@/hooks/api/delivery/useUpdateDeliveryDriver";
import useUpdatePickupDriver from "@/hooks/api/pickup/useUpdatePickupDriver";
import { format } from "date-fns";
import { IoMdCheckmarkCircle } from "react-icons/io";

interface DeliveryOrderCardProps {
  deliveryNumber: string;
  status: string;
  customer: string;
  customerAddress: string;
  outlet: string;
  timeOfOrder: Date;
  id: number;
}

const DeliveryOrderCard: React.FC<DeliveryOrderCardProps> = ({
  deliveryNumber,
  status,
  customer,
  customerAddress,
  outlet,
  timeOfOrder,
  id,
}) => {
  const { mutateAsync } = useUpdateDeliveryDriver();
  const result = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  const createdAt = format(new Date(timeOfOrder), "dd MMM yyyy, HH:mm:ss");

  return (
    <Card>
      <div className="flex flex-row items-center justify-between bg-[#e5f3f6] p-4">
        <span className="font-semibold">{deliveryNumber}</span>
        <Badge>{outlet}</Badge>
      </div>
      <div className="space-y-2 p-4">
        <div className="rounded-md bg-neutral-100 p-2 text-center">
          {status}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p>Customer:</p>
            <p className="line-clamp-2 max-w-[16ch] break-all">{customer}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Time order:</p>
            <p>{createdAt}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Address: </p>
            <p className="line-clamp-2 max-w-[16ch] break-all">
              {customerAddress}
            </p>
          </div>
        </div>
        <div className="rounded-md bg-neutral-100 p-2 text-center">
          {status === "ON_THE_WAY_TO_CUSTOMER" ? (
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
                            id: Number(id),
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
          ) : status === "WAITING_FOR_DRIVER" ? (
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
                          id: Number(id),
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
          ) : status === "ON_THE_WAY_TO_OUTLET" ? (
            <div className="flex justify-around">
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
                            id: Number(id),
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
                            id: Number(id),
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
            </div>
          ) : null}
        </div>
      </div>
    </Card>
  );
};

export default DeliveryOrderCard;
