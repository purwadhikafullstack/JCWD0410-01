"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useConfirmOrder from "@/hooks/api/order/useConfirmOrder";
import useGetOrderUser from "@/hooks/api/order/useGetOrderUser";
import useProcessPayment from "@/hooks/api/payment/useProcessPayment";
import useUpdatePaymentSuccess from "@/hooks/api/payment/useUpdatePaymentSuccess";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

const OrderDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { data, isPending, refetch } = useGetOrderUser(Number(id));
  const { mutateAsync: processPayment } = useProcessPayment();
  const {mutateAsync: paymentSuccess} = useUpdatePaymentSuccess()
  const {mutateAsync: confirmOrder} = useConfirmOrder()

  const statusLabels = {
    WAITING_FOR_PICKUP_DRIVER: "Waiting for pickup driver",
    PICKUP_ON_THE_WAY_TO_CUSTOMER: "Pickup on the way to customer",
    PICKUP_ON_THE_WAY_TO_OUTLET: "Pickup on the way to outlet",
    ARRIVED_AT_OUTLET: "Arrived at outlet",
    READY_FOR_WASHING: "Ready for washing",
    BEING_WASHED: "Being washed",
    WASHING_COMPLETED: "Washing complete",
    BEING_IRONED: "Being Ironed",
    IRONING_COMPLETED: "Ironing complete",
    BEING_PACKED: "Being packed",
    AWAITING_PAYMENT: "Awaiting payment",
    READY_FOR_DELIVERY: "Ready for delivery",
    WAITING_FOR_DELIVERY_DRIVER: "Waiting for delivery driver",
    BEING_DELIVERED_TO_CUSTOMER: "Being delivered to customer",
    RECEIVED_BY_CUSTOMER: "Received by customer",
  };

  const orderStatusLabel = data?.orderStatus
    ? statusLabels[data.orderStatus]
    : "";

  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    const myMidtransClientKey = process.env.MIDTRANS_CLIENT_KEY!;
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);
    scriptTag.async = true;

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handlePayment = async () => {
    try {
      const payment = await processPayment({ orderId: Number(id) });
      if (payment) {
        if (window.snap) {
          window.snap.pay(`${payment.snapToken}`, {
            onSuccess: function (result: any) {
              toast.success("Payment success!");
              paymentSuccess({invoice: payment.invoiceNumber})
              router.refresh();
            },
            onPending: function (result: any) {
              toast.success("Payment pending");
              router.refresh();
            },
            onError: function (result: any) {
              toast("Payment failed!");
              router.refresh();
            },
            onClose: function () {
              router.refresh();
            },
          });
        } else {
          alert("Snap is not loaded yet. Please try again.");
        }
      }
    } catch (error) {
      alert("Payment Error!");
    }
  };

  if (isPending) {
    <Loader2 className="mx-auto animate-spin" />;
  } else if (data) {
    const createdAt = format(new Date(data.createdAt), "dd MMM yyyy, HH:mm:ss");
    const unprocessed =
      data.orderStatus === "WAITING_FOR_PICKUP_DRIVER" ||
      data.orderStatus === "PICKUP_ON_THE_WAY_TO_CUSTOMER" ||
      data.orderStatus === "PICKUP_ON_THE_WAY_TO_OUTLET" ||
      data.orderStatus === "ARRIVED_AT_OUTLET";
    return (
      <div className="text-md md: mx-auto max-w-7xl h-full bg-white pt-4">
        <Card className="mb-[-4px] shadow-sm">
          <CardHeader>
            <CardTitle className="text-center text-xl">Order Detail</CardTitle>
          </CardHeader>
          <div className="container m-auto flex flex-col gap-4 bg-sky-300 p-8 md:rounded-tl-xl md:rounded-tr-xl">
            <div className="flex flex-col gap-2 rounded-xl bg-white p-6 shadow-lg">
              <div className="mx-auto flex justify-start gap-2">
                <p className="text-md mb-2 text-center font-bold">
                  {data.orderNumber}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <p className="text-sm font-bold">Order Date</p>
                  <p className="text-sm text-gray-500">{createdAt}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-semibold">Name</p>
                  <p className="text-sm text-gray-500">{data.user.name}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-semibold">Email</p>
                  <p className="text-sm text-gray-500">{data.user.email}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-semibold">Outlet</p>
                  <p className="text-sm text-gray-500">{data.outlet.name}</p>
                </div>
              </div>
              <Separator />
              <div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <p className="text-sm font-semibold">Pickup Number</p>
                    <p className="text-sm text-gray-500">
                      {data.pickupOrders[0].pickupNumber}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm font-semibold">Delivery Number</p>
                    <p className="text-sm text-gray-500">
                      {data.deliveryOrders[0].deliveryNumber}
                    </p>
                  </div>
                </div>
              </div>
              <Separator />
              <div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <p className="text-sm font-semibold">Laundry Items</p>
                  </div>
                  <div className="flex flex-col pl-5 text-left">
                    {data.orderItems.map((item, index) => {
                      return (
                        <div key={index} className="flex justify-between">
                          <p className="text-sm">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            {item.itemQuantity} Pcs
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm font-semibold">Total Weight</p>
                    <p className="text-sm">{data.weight} kg</p>
                  </div>
                </div>
              </div>
              <Separator />
              <div>
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <p className="text-sm font-semibold">Price</p>
                  </div>
                  <div className="flex flex-col pl-5">
                    <div className="flex justify-between">
                      <p className="text-sm">Pickup Cost</p>
                      <p className="text-sm">
                        {formatCurrency(Number(data.pickupOrders[0].fee))}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm">Delivery Cost</p>
                      <p className="text-sm">
                        {formatCurrency(Number(data.deliveryOrders[0].fee))}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm">Laundry Cost</p>
                      <p className="text-sm">
                        {formatCurrency(Number(data.laundryFee))}
                      </p>
                    </div>
                    <div className="flex justify-between pl-4 text-sm">
                      <p className="text-sm">Total</p>
                      <p className="font-bold">
                        {formatCurrency(Number(data.total))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="flex flex-col">
                <div className="mb-2 flex justify-between">
                  <p className="text-sm font-semibold">Status :</p>
                  <p className="text-lg">{orderStatusLabel}</p>
                </div>
                <div className="mb-2 flex justify-between">
                  <p className="text-sm font-semibold">Payment status :</p>
                  <p className="text-lg">{data.isPaid ? "Paid" : "Unpaid"}</p>
                </div>
                {data.deliveryOrders[0].status === "RECEIVED_BY_CUSTOMER" &&
                data.orderStatus === "BEING_DELIVERED_TO_CUSTOMER" ? (
                  <Button
                  onClick={() => {
                    confirmOrder({orderId: Number(id)});
                  }}
                  >
                    Press to confirm delivery
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      handlePayment();
                    }}
                    disabled={unprocessed}
                  >
                    {unprocessed ? "Order in process" : "Payment"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  } else {
    <>{router.push("/")}</>;
  }
};

export default OrderDetailPage;
