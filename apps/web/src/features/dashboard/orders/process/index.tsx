"use client";

import DashboardHeader from "@/components/DashboardHeader";
import FormInput from "@/components/FormInput";
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
import {
  Formik,
  Form,
  Field,
  FieldArray,
  ErrorMessage,
  FormikProvider,
} from "formik";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";
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
        <div className="text-md md: mx-auto h-full bg-white p-4 pt-24">
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
                          <div key={index} className="grid grid-rows-2 mb-[-40px]">
                            <div className="flex gap-8">
                              <div className="flex md:w-[200px] flex-col space-y-2 w-[150px]">
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

                              {index === 0 ? <button
                                  type="button"
                                  className="pt-8 cursor-none"
                                >
                                </button> : (
                                <button
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)}
                                  className="pt-4 text-red-500 text-3xl"
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
                  {/* {(Object.keys(formik.errors).length !== 0) ? (
                    <div className="text-red-500">
                      {Object.keys(formik.errors).join(", ")} has error
                    </div>
                  ) : (
                    <div></div>
                  )} */}

                  {/* {formikError ? <div>{Object.keys(formik.errors.orderItems).toString()} </div> :null} */}

                  {/* {formik.errors.orderItems ? "name" in Object.keys(formik.errors.orderItems) ? <p className="text-xs text-red-500">Item name must consist of at least 3 characters</p> : null : null} */}
                  {/* <p className="text-xs text-red-500">Laundry item must be selected</p>
                  <p className="text-xs text-red-500">Item name must consist of at least 3 characters</p>
                  <p className="text-xs text-red-500">Item quantity must be a positive integer</p> */}

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
              {/* <form className="space-y-6" onSubmit={formik.handleSubmit}>
                <FormInput
                  name="weight"
                  label="Weight"
                  type="number"
                  placeholder="Masukkan berat laundry"
                  value={formik.values.weight}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  isError={!!formik.touched.weight && !!formik.errors.weight}
                  error={formik.errors.weight}
                />
                <div>
                  <Label htmlFor="role" className="">
                    Role
                  </Label>

                  <Select onValueChange={handleSelectRole} defaultValue={role}>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Role</SelectLabel>
                        <SelectItem value="OUTLET_ADMIN">
                          Outlet Admin
                        </SelectItem>
                        <SelectItem value="DRIVER">Driver</SelectItem>
                        <SelectItem value="WORKER">Worker</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="outletId" className="">
                    Outlet
                  </Label>

                  <Select
                    onValueChange={handleOutletId}
                    defaultValue={outletId}
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Outlet" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Outlet</SelectLabel>
                        {outlets?.data.map((outlet) => {
                          return (
                            <SelectItem
                              value={String(outlet.id)}
                              key={outlet.id}
                            >
                              {outlet.name}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="stationId" className="">
                    Worker Station
                  </Label>

                  <Select
                    onValueChange={handleStationId}
                    defaultValue={stationId}
                    disabled={role !== "WORKER"}
                  >
                    <SelectTrigger className="">
                      {role !== "WORKER" ? null : (
                        <SelectValue placeholder="Washing" />
                      )}
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Station</SelectLabel>
                        <SelectItem value="1">Washing</SelectItem>
                        <SelectItem value="2">Ironing</SelectItem>
                        <SelectItem value="3">Packing</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  className="bg-[#36bbe3]"
                  disabled={isPending}
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
              </form> */}
              {/* <Formik
                initialValues={{
                  weight: 0,
                  orderId: Number(id),
                  orderItems: [
                    {
                      name: "",
                      itemQuantity: 0,
                      laundryItemId: 0,
                    },
                  ],
                }}
                // validationSchema={}
                onSubmit={async (values) => {
                  // await createEmployee(values);
                }}
                render={({ values }) => (
                  <Form>
                    <FieldArray
                      name="values.orderItems"
                      render={(arrayHelpers) => (
                        <div>
                          {values.orderItems.map((item, index) => (
                            <div key={index} className="flex gap-8">
                              <Field name={`item[${index}].name`}>
                                {({
                                  field, // { name, value, onChange, onBlur }
                                  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                  meta,
                                }) => (
                                  <div>
                                    <FormInput
                                      name={`item[${index}].name`}
                                      label="Name"
                                      type="text"
                                      placeholder="Item name"
                                      value={formik.values.weight}
                                      onBlur={formik.handleBlur}
                                      onChange={formik.handleChange}
                                      isError={
                                        !!formik.touched.weight &&
                                        !!formik.errors.weight
                                      }
                                      error={formik.errors.weight}
                                    />
                                    <input
                                      type="text"
                                      placeholder="Item name"
                                      {...field}
                                    />
                                    {meta.touched && meta.error && (
                                      <div className="error">{meta.error}</div>
                                    )}
                                  </div>
                                )}
                              </Field>
                              <Field
                                placeholder="Quantity"
                                type="number"
                                name={`item.${index}.itemQuantity`}
                              />

                              <button
                                type="button"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                -
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() =>
                              arrayHelpers.push({ name: "", age: "" })
                            }
                          >
                            +
                          </button>
                        </div>
                      )}
                    />
                  </Form>
                )}
              /> */}
              {/* <Formik
                initialValues={{
                  weight: 0,
                  orderId: Number(id),
                  orderItems: [
                    {
                      name: "",
                      itemQuantity: 0,
                      laundryItemId: 0,
                    },
                  ],
                }}
                // validationSchema={}
                onSubmit={async (values) => {
                  // await createEmployee(values);
                }}
                // onSubmit={async (values) => {
                //   await new Promise((r) => setTimeout(r, 500));
                //   alert(JSON.stringify(values, null, 2));
                // }}
              >
                {({ values }) => (
                  <Form>
                    <FieldArray name="orderItems">
                      {({ insert, remove, push }) => (
                        <div>
                          {values.orderItems.length > 0 &&
                            values.orderItems.map((item, index) => (
                              <div className="flex gap-4" key={index}>
                                <div className="col">
                                  <label
                                    htmlFor={`orderItems.${index}.name`}
                                    className="mx-2"
                                  >
                                    Name
                                  </label>
                                  <Field
                                    name={`orderItems.${index}.name`}
                                    placeholder="Jane Doe"
                                    type="text"
                                    style={{
                                      border: "1px solid black",
                                      padding: "4px 8px",
                                    }}
                                  />
                                  <ErrorMessage
                                    name={`orderItems.${index}.name`}
                                    component="div"
                                    className="field-error"
                                  />
                                </div>
                                <div className="col">
                                  <FormInput
                                    name="weight"
                                    label="Weight"
                                    type="number"
                                    placeholder="Masukkan berat laundry"
                                    value={values.weight}
                                    onBlur={values.weight.handleBlur}
                                    onChange={handleChange}
                                    isError={
                                      !!formik.touched.weight &&
                                      !!formik.errors.weight
                                    }
                                    error={formik.errors.weight}
                                  />
                                </div>
                                <div className="col">
                                  <button
                                    type="button"
                                    className="secondary"
                                    onClick={() => remove(index)}
                                  >
                                    X
                                  </button>
                                </div>
                              </div>
                            ))}
                          <button
                            type="button"
                            className="secondary"
                            onClick={() => push({ name: "", email: "" })}
                          >
                            Add Friend
                          </button>
                        </div>
                      )}
                    </FieldArray>
                    <button type="submit">Invite</button>
                  </Form>
                )}
              </Formik> */}
              {/* <Field
                                name={`orderItems.${index}.laundryItemId`}
                                render={({
                                  field,
                                }: {
                                  field: FieldProps["field"];
                                }) => {
                                  return (
                                    <>
                                      <Select
                                        {...field}
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
                                            <SelectLabel>
                                              Laundry Item
                                            </SelectLabel>
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
                                    </>
                                  );
                                }}
                              />
                            </div>
                            <FormInput
                                      label="Item name"
                                      placeholder="Masukkan nama item"
                                      type="text"
                                      {...field}
                                      // name={`orderItems[${index}].name`}
                                      // value={
                                      //   formik.values.orderItems[index].name
                                      // }
                                      // onBlur={formik.handleBlur}
                                      // onChange={formik.handleChange}
                                      onBlur={()=>{console.log(field.);
                                      }}
                                      // isError={
                                      //   !!formik.touched.orderItems &&
                                      //   !!formik.errors.orderItems
                                      // }
                                      error={{...field}.toString()}
                                    />
                            <Field name={`orderItems.${index}.name`}>
                            render={({
                                field,
                              }: {
                                field: FieldProps["field"];
                              })}
                              {({
                                field, // { name, value, onChange, onBlur }
                                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                meta,
                              }: {field: FieldProps["field"], form: , meta: }) => (
                                <div>
                                  <input
                                    type="text"
                                    placeholder="Email"
                                    {...field}
                                  />
                                  {meta.touched && meta.error && (
                                    <div className="error">{meta.error}</div>
                                  )}
                                </div>
                              )}
                            </Field>
                            <Field
                              name={`orderItems.${index}.name`}
                              render={({
                                field,
                                form: { touched, errors },
                                meta,
                              }: {
                                field: FieldProps["field"];
                                form: any;
                                meta: any;
                              }) => {
                                return (
                                  <>
                                    <FormInput
                                      label="Item name"
                                      placeholder="Masukkan nama item"
                                      type="text"
                                      {...field}
                                      // name={`orderItems[${index}].name`}
                                      // value={
                                      //   formik.values.orderItems[index].name
                                      // }
                                      // onBlur={formik.handleBlur}
                                      // onChange={formik.handleChange}
                                      isError={
                                        !!meta.touched[field.name] &&
                                        !!meta.errors[field.name]
                                      }
                                      error={errors[field.name]}
                                    />
                                  </>
                                );
                              }}
                            />

                            <Field
                              name={`orderItems.${index}.itemQuantity`}
                              render={({
                                field,
                              }: {
                                field: FieldProps["field"];
                              }) => {
                                return (
                                  <>
                                    <FormInput
                                      {...field}
                                      name={`orderItems[${index}].itemQuantity`}
                                      label="Item Quantity"
                                      type="number"
                                      placeholder="Masukkan jumlah item"
                                      value={
                                        formik.values.orderItems[index]
                                          .itemQuantity
                                      }
                                      onBlur={formik.handleBlur}
                                      onChange={formik.handleChange}
                                      isError={
                                        !!formik.touched.orderItems &&
                                        !!formik.errors.orderItems
                                      }
                                      error={""}
                                    />
                                  </>
                                );
                                }}
                                /> */}
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
