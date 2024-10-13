"use client";

import DashboardHeader from "@/components/DashboardHeader";
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useGetLaundryItems from "@/hooks/api/laundry-item/useGetLaundryItems";
import useGetOrderItems from "@/hooks/api/order-item/useGetOrderItems";
import useUpdateWorkOrderWorker from "@/hooks/api/work/useUpdateWorkOrdersWorker";
import { WorkStatus } from "@/types/work-order";
import {
  ErrorMessage,
  FieldArray,
  FormikProvider,
  FormikValues,
  useFormik,
} from "formik";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { SpinnerCircularFixed } from "spinners-react";
import * as Yup from "yup";
import DashboardWorkOrderBypassPage from "../../admins/bypass";

interface CountState {
  num: number;
  arr: number[];
}

const DashboardWorkOrderProcessPage = () => {
  const session = useSession();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [formikError, setFormikError] = useState(true);
  const [count, setCount] = useState<CountState>({ num: 0, arr: [] });
  const [initialValues, setInitialValues] = useState<FormikValues>({
    items: [],
  });
  const { data: items, isPending: getLaundryItemsPending } = useGetLaundryItems(
    { take: 10 },
  );
  const { data: orderItems, isPending: getOrderItemsPending } =
    useGetOrderItems({ workOrderId: id });
  const { mutateAsync: updateWork, isPending } = useUpdateWorkOrderWorker();

  const formik = useFormik({
    initialValues: {
      orderItems: [
        {
          name: "",
          itemQuantity: 0,
          laundryItemId: 0,
        },
      ],
    },
    // validationSchema: {ProcessWorkOrderSchema},
    enableReinitialize: true,
    onSubmit: async (values) => {
      // await processOrder(values);
    },
  });

  const handleProcess = (num1: number, num2: number, index: number) => {
    setFormikError(true);
    const arr = count.arr.filter((isi) => {
      return isi !== index;
    });
    const num = arr.length;
    setCount({
      num: num,
      arr: arr,
    });
    if (num1 === num2) {
      if (count.arr.includes(index)) {
      } else {
        count.num += 1;
        setCount({ num: count.num, arr: count.arr.concat(index) });
      }
      if (count.num === orderItems?.data.length) {
        setFormikError(false);
      }
    }
  };

  if (!session.data) {
    return <DashboardHeader />;
  }
  if (getOrderItemsPending || getLaundryItemsPending) {
    return (
      <>
        <DashboardHeader />
      </>
    );
  }
  if (!orderItems?.data) {
    return <>{router.push("/not-found")}</>;
  }

  if (session.data.user.role === "WORKER") {
    return (
      <>
        <DashboardHeader />
        <div className="text-md md: mx-auto h-full bg-white p-4">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Process Order Form</CardTitle>
              <CardDescription>Fill the following form</CardDescription>
            </CardHeader>
            {}
            <CardContent>
              <form className="space-y-6" onSubmit={formik.handleSubmit}>
                <FormikProvider value={formik}>
                  <FieldArray
                    name="orderItems?.data"
                    render={(arrayHelpers) => (
                      <div>
                        {orderItems?.data.map((item, index) => (
                          <div key={index} className="grid grid-rows-2">
                            <div className="flex gap-8">
                              <div className="flex w-[150px] flex-col space-y-2 text-xs md:w-[200px] md:text-base">
                                <Label
                                  htmlFor="laundryItemId"
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  Laundry Item
                                </Label>
                                <div className="flex h-9 w-full cursor-not-allowed rounded-md border border-input bg-transparent px-3 py-2 text-center text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                                  {
                                    items?.data[
                                      items?.data.findIndex(
                                        (isi) =>
                                          isi.id ===
                                          orderItems?.data[index].laundryItemId,
                                      )
                                    ].name
                                  }
                                </div>
                              </div>
                              <div
                                className={`flex w-[150px] flex-col space-y-2 text-xs md:w-[200px] md:text-base`}
                              >
                                <Label>Item name</Label>
                                <div className="flex h-9 w-full cursor-not-allowed rounded-md border border-input bg-transparent px-3 py-2 text-center text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                                  {orderItems?.data[index].name}
                                </div>
                              </div>

                              <div
                                className={`flex w-[100px] flex-col space-y-2 text-xs md:w-[100px] md:text-base`}
                              >
                                <Label>{`Qty (${orderItems?.data[index].itemQuantity})`}</Label>

                                <Input
                                  name={`orderItems[${index}].itemQuantity`}
                                  onChange={(e) => {
                                    handleProcess(
                                      Number(e.target.value),
                                      orderItems?.data[index].itemQuantity!,
                                      index,
                                    );
                                  }}
                                  type="number"
                                  placeholder={`Item qty`}
                                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                ></Input>
                              </div>
                            </div>
                            <div className="flex gap-2 text-red-500">
                              <div className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                <ErrorMessage
                                  name={`orderItems.${index}.laundryItemId`}
                                />
                              </div>
                              <div className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                <ErrorMessage
                                  name={`orderItems.${index}.name`}
                                />
                              </div>
                              <div className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                <ErrorMessage
                                  name={`orderItems.${index}.itemQuantity`}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  />

                  <div className="flex gap-8">
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Button
                          className="bg-red-400 hover:bg-red-600"
                          type="button"
                        >
                          Bypass
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Do you want to bypass this order?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Click confirm to bypass.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              updateWork({
                                status: WorkStatus.BYPASSED,
                                id: Number(id),
                              });
                              router.push("/dashboard/work-orders");
                            }}
                          >
                            Confirm
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <Button
                      className="bg-[#36bbe3]"
                      disabled={isPending || formikError}
                      type="submit"
                      onClick={() => {
                        updateWork({
                          status: orderItems.data[0].workOrderStatus,
                          id: Number(id),
                        });
                        router.push("/dashboard/work-orders");
                      }}
                    >
                      {isPending ? (
                        <div className="flex items-center gap-1">
                          <SpinnerCircularFixed size={20} />
                          <p className="text-sm">Loading</p>
                        </div>
                      ) : (
                        "Confirm"
                      )}
                    </Button>
                  </div>
                </FormikProvider>
              </form>
            </CardContent>
          </Card>
        </div>
      </>
    );
  } else {
    return <DashboardWorkOrderBypassPage />;
  }
};

export default DashboardWorkOrderProcessPage;
