"use client";

import DashboardHeader from "@/components/DashboardHeader";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetLaundryItems from "@/hooks/api/laundry-item/useGetLaundryItems";
import useProcessOrder from "@/hooks/api/order/useProcessOrder";
import { ErrorMessage, FieldArray, FormikProvider, useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SpinnerCircularFixed } from "spinners-react";
import { ProcessOrderSchema } from "../schemas/ProcessOrderSchema";

const DashboardOrderProcessPage = () => {
  const session = useSession();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [formikError, setFormikError] = useState(true);
  const { mutateAsync: processOrder, isPending } = useProcessOrder();
  const { data: items } = useGetLaundryItems({ take: 10 });

  const formik = useFormik({
    initialValues: {
      weight: 0,
      orderId: Number(id),
      orderItems: [
        {
          name: "",
          itemQuantity: 0,
          laundryItemId: 0,
        },
      ],
    },
    validationSchema: ProcessOrderSchema,
    onSubmit: async (values) => {
      await processOrder(values);
    },
  });

  const handleLaundryItem = (value: string, index: number) => {
    formik.values.orderItems[index].laundryItemId = Number(value);
  };

  useEffect(() => {
    if (Object.keys(formik.errors).length !== 0) {
      setFormikError(true);
    } else {
      setFormikError(false);
    }
  }, [formik.errors]);

  useEffect(() => {
    setFormikError(true);
  }, []);

  if (!session.data) {
    return <DashboardHeader />;
  }

  if (
    session.data.user.role === "ADMIN" ||
    session.data.user.role === "OUTLET_ADMIN"
  ) {
    return (
      <>
        <DashboardHeader />
        <div className="text-md md: mx-auto h-full bg-white p-4">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Process Order Form</CardTitle>
              <CardDescription>Fill the following form</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={formik.handleSubmit}>
                <FormikProvider value={formik}>
                  <FieldArray
                    name="orderItems"
                    render={(arrayHelpers) => (
                      <div>
                        {formik.values.orderItems.map((item, index) => (
                          <div
                            key={index}
                            className="mb-[-40px] grid grid-rows-2"
                          >
                            <div className="flex gap-8">
                              <div className="flex w-[150px] flex-col space-y-2 md:w-[200px]">
                                <Label
                                  htmlFor="laundryItemId"
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  Laundry Item {index + 1}
                                </Label>

                                <Select
                                  onValueChange={(value) => {
                                    handleLaundryItem(value, index);
                                  }}
                                  defaultValue={""}
                                >
                                  <SelectTrigger className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                                    <SelectValue placeholder="Laundry Item" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectLabel>Laundry Item</SelectLabel>
                                      {items?.data.map((item) => {
                                        return (
                                          <SelectItem
                                            value={String(item.id)}
                                            key={item.id}
                                          >
                                            {item.name}
                                          </SelectItem>
                                        );
                                      })}
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              </div>
                              <FormInput
                                name={`orderItems[${index}].name`}
                                label="Item name"
                                type="text"
                                placeholder="Nama item"
                                value={formik.values.orderItems[index].name}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                isError={
                                  !!formik.touched.orderItems &&
                                  !!formik.errors.orderItems
                                }
                                error={""}
                                classname="w-[150px] md:text-base text-xs md:w-[200px]"
                              />

                              <FormInput
                                name={`orderItems[${index}].itemQuantity`}
                                label="Item Quantity"
                                type="number"
                                placeholder="Qty"
                                value={
                                  formik.values.orderItems[index].itemQuantity
                                }
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                isError={
                                  !!formik.touched.orderItems &&
                                  !!formik.errors.orderItems
                                }
                                error={""}
                                classname="md:w-[150px] md:text-base text-xs w-[100px]"
                              />

                              {index === 0 ? (
                                <button
                                  type="button"
                                  className="cursor-none pt-8"
                                ></button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)}
                                  className="pt-4 text-3xl text-red-500"
                                >
                                  -
                                </button>
                              )}
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
                        <button
                          type="button"
                          onClick={() => arrayHelpers.push({})}
                          className="mt-[-40px] text-3xl"
                        >
                          +
                        </button>
                      </div>
                    )}
                  />
                  <FormInput
                    name="weight"
                    label="Weight (Kg)"
                    type="number"
                    placeholder="Masukkan berat laundry"
                    value={formik.values.weight}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    isError={!!formik.touched.weight && !!formik.errors.weight}
                    error={formik.errors.weight}
                    classname="mt-4 w-[200px]"
                  />

                  <Button
                    className="bg-[#36bbe3]"
                    disabled={isPending || formikError}
                    type="submit"
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
                </FormikProvider>
              </form>
            </CardContent>
          </Card>
        </div>
      </>
    );
  } else {
    return (
      <>
        <nav className="fixed z-50 h-20 w-full content-center bg-blue-200 p-3 md:w-[calc(100%-256px)]"></nav>
        <div className="md: mx-auto h-full bg-white p-4 pt-24 text-xl font-bold">
          <>{router.push("/dashboard")}</>
        </div>
      </>
    );
  }
};

export default DashboardOrderProcessPage;
