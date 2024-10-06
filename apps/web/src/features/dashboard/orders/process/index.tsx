"use client";

import DashboardHeader from "@/components/DashboardHeader";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import useGetLaundryItems from "@/hooks/api/laundry-item/useGetLaundryItems";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { SpinnerCircularFixed } from "spinners-react";

const DashboardOrderProcessPage = () => {
  const session = useSession();
  const router = useRouter();
  const {data: items} = useGetLaundryItems({take: 10});

  // const formik = useFormik({
  //   initialValues: {
  //     profilePicture: "",
  //     password: "",
  //     phoneNumber: "",
  //     name: "",
  //     email: "",
  //     role,
  //     stationId: "",
  //     outletId,
  //   },
  //   validationSchema: UpdateProfileSchema,
  //   onSubmit: async (values) => {
  //     await createEmployee(values);
  //   },
  // });

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
        {/* <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Process Order Form</CardTitle>
            <CardDescription>
              Fill the following form
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
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
              <FormInput
                name="laundryFee"
                label="Laundry Fee"
                type="number"
                placeholder="Masukkan laundry fee"
                value={formik.values.laundryFee}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                isError={!!formik.touched.laundryFee && !!formik.errors.laundryFee}
                error={formik.errors.laundryFee}
              />
              <FormInput
                name="phoneNumber"
                label="Phone Number"
                type="text"
                placeholder="Masukkan nomor employee"
                value={formik.values.phoneNumber}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                isError={
                  !!formik.touched.phoneNumber && !!formik.errors.phoneNumber
                }
                error={formik.errors.phoneNumber}
              />
              <FormInput
                name="password"
                label="Password"
                type="password"
                placeholder="Masukkan password untuk employee"
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                isError={!!formik.touched.password && !!formik.errors.password}
                error={formik.errors.password}
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
                      <SelectItem value="OUTLET_ADMIN">Outlet Admin</SelectItem>
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

                <Select onValueChange={handleOutletId} defaultValue={outletId}>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Outlet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Outlet</SelectLabel>
                      {outlets?.data.map((outlet) => {
                        return (
                          <SelectItem value={String(outlet.id)} key={outlet.id}>
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
                    {role !== "WORKER" ? null : <SelectValue placeholder="Washing"/>}
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
            </form>
          </CardContent>
        </Card> */}
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
