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
import useUpdateWorkOrderWorker from "@/hooks/api/work/useUpdateWorkOrdersWorker";
import { WorkStatus } from "@/types/work-order";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { IoMdCheckmarkCircle } from "react-icons/io";

interface WorkOrderCardProps {
  orderNumber: string;
  status: WorkStatus;
  stationId: number;
  timeOfOrder: Date;
  id: number;
}

const WorkOrderCardWorker: React.FC<WorkOrderCardProps> = ({
  orderNumber,
  status,
  stationId,
  timeOfOrder,
  id,
}) => {
  const result = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  const { mutateAsync } = useUpdateWorkOrderWorker();
  const router = useRouter();
  const createdAt = format(new Date(timeOfOrder), "dd MMM yyyy, HH:mm:ss");

  return (
    <Card>
      <div className="flex flex-row items-center justify-between bg-[#e5f3f6] p-4">
        <span className="font-semibold">{orderNumber}</span>
        <Badge>Work Order</Badge>
      </div>
      <div className="space-y-2 p-4">
        <div className="rounded-md bg-neutral-100 p-2 text-center">
          {status}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p>Station:</p>
            <p className="line-clamp-2 max-w-[16ch] break-all">
              {stationId === 1
                ? "Washing"
                : stationId === 2
                  ? "Ironing"
                  : "Packing"}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p>Time order:</p>
            <p>{createdAt}</p>
          </div>
        </div>
        <div className="rounded-md bg-neutral-100 p-2 text-center">
          {status === "READY_FOR_WASHING" ? (
            <div>
              <AlertDialog>
                <AlertDialogTrigger>
                  <span className="flex cursor-pointer items-center text-green-500">
                    <IoMdCheckmarkCircle className="mr-1" /> Claim work
                  </span>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Do you want to accept this order?
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
                          status: status,
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
          ) : status === "BEING_WASHED" ? (
            <div>
              <AlertDialog>
                <AlertDialogTrigger>
                  <span className="flex cursor-pointer items-center text-green-500">
                    <IoMdCheckmarkCircle className="mr-1" /> Process
                  </span>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Do you want to process this order?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Click continue to head to the process page.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        router.push(`/dashboard/work-orders/${Number(id)}`);
                      }}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ) : status === "WASHING_COMPLETED" ? (
            <div className="line-clamp-2 max-w-[20ch] break-all">
              Washing complete
            </div>
          ) : status === "READY_FOR_IRONING" ? (
            <div>
              <AlertDialog>
                <AlertDialogTrigger>
                  <span className="flex cursor-pointer items-center text-green-500">
                    <IoMdCheckmarkCircle className="mr-1" /> Claim work
                  </span>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Do you want to accept this order?
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
                          status: WorkStatus.READY_FOR_IRONING,
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
          ) : status === "BEING_IRONED" ? (
            <div>
              <AlertDialog>
                <AlertDialogTrigger>
                  <span className="flex cursor-pointer items-center text-green-500">
                    <IoMdCheckmarkCircle className="mr-1" /> Process
                  </span>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Do you want to process this order?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Click continue to head to the process page.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        router.push(`/dashboard/work-orders/${Number(id)}`);
                      }}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ) : status === "IRONING_COMPLETED" ? (
            <div className="line-clamp-2 max-w-[20ch] break-all">
              Ironing complete
            </div>
          ) : status === "READY_FOR_PACKING" ? (
            <div>
              <AlertDialog>
                <AlertDialogTrigger>
                  <span className="flex cursor-pointer items-center text-green-500">
                    <IoMdCheckmarkCircle className="mr-1" /> Claim work
                  </span>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Do you want to accept this order?
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
                          status: WorkStatus.READY_FOR_PACKING,
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
          ) : status === "BEING_PACKED" ? (
            <div>
              <AlertDialog>
                <AlertDialogTrigger>
                  <span className="flex cursor-pointer items-center text-green-500">
                    <IoMdCheckmarkCircle className="mr-1" /> Process
                  </span>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Do you want to process this order?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Click continue to head to the process page.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        router.push(`/dashboard/work-orders/${Number(id)}`);
                      }}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ) : status === "PACKING_COMPLETED" ? (
            <div className="line-clamp-2 max-w-[20ch] break-all">
              Packing complete
            </div>
          ) : status === "BYPASSED" ? (
            <div className="line-clamp-2 max-w-[20ch] break-all">Bypassed</div>
          ) : null}
        </div>
      </div>
    </Card>
  );
};

export default WorkOrderCardWorker;
