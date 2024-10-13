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
import { format } from "date-fns";
import { IoMdCheckmarkCircle } from "react-icons/io";

interface OrderCardProps {
  key: number;
  orderNumber: string;
  orderStatus: string;
  totalFee: number;
  paymentStatus: boolean;
  outlet: string;
  timeOfOrder: Date;
  action: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({
  orderNumber,
  orderStatus,
  totalFee,
  paymentStatus,
  outlet,
  timeOfOrder,
}) => {
  const result = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  const createdAt = format(new Date(timeOfOrder), "dd MMM yyyy, HH:mm:ss");

  return (
    <Card>
      <div className="flex flex-row items-center justify-between bg-[#e5f3f6] p-4">
        <span className="font-semibold">{orderNumber}</span>
        <Badge>{outlet}</Badge>
      </div>
      <div className="space-y-2 p-4">
        <div className="rounded-md bg-neutral-100 p-2 text-center">
          {orderStatus}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p>Time order:</p>
            <p>{createdAt}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Total fee:</p>
            <p>
              {orderStatus === "WAITING_FOR_PICKUP_DRIVER" ||
              orderStatus === "PICKUP_ON_THE_WAY_TO_CUSTOMER" ||
              orderStatus === "PICKUP_ON_THE_WAY_TO_OUTLET" ||
              orderStatus === "ARRIVED_AT_OUTLET"
                ? "Awaiting process"
                : result.format(totalFee)}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p>Payment status:</p>
            <p>{paymentStatus ? "Paid" : "Unpaid"}</p>
          </div>
          {orderStatus === "ARRIVED_AT_OUTLET" && (
            <AlertDialog>
              <AlertDialogTrigger>
                <span className="flex w-full cursor-pointer items-center justify-end text-green-500">
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
                  // onClick={() => {
                  //   router.push(`/dashboard/orders/${row.original.id}`);
                  // }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>
    </Card>
  );
};

export default OrderCard;
