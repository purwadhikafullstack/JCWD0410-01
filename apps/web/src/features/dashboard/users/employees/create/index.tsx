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
import { Input } from "@/components/ui/input";
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
import useCreateEmployee from "@/hooks/api/admin/useCreateEmployee";
import useGetOutlets from "@/hooks/api/outlet/useGetOutlets";
import { Role } from "@/types/user";
import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useRef, useState } from "react";
import { SpinnerCircularFixed } from "spinners-react";

const DashboardCreateEmployeePage = () => {
  const session = useSession();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [role, setRole] = useState("OUTLET_ADMIN");
  const [outletId, setOutletId] = useState("2");
  const [stationId, setStationId] = useState("1");
  const { mutateAsync: createEmployee, isPending } = useCreateEmployee();
  const { data: outlets } = useGetOutlets({ take: 5 });
  // const [role, setRole] = useState("OUTLET_ADMIN");

  const formik = useFormik({
    initialValues: {
      profilePicture: "",
      password: "",
      phoneNumber: "",
      name: "",
      email: "",
      role,
      stationId: "",
      outletId,
    },
    // validationSchema: UpdateProfileSchema,
    onSubmit: async (values) => {
      await createEmployee(values);
    },
  });

  const onChangeProfilePicture = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      formik.setFieldValue("profilePicture", files[0]);
      setSelectedImage(URL.createObjectURL(files[0]));
    }
  };

  const removeSelectedImage = () => {
    formik.setFieldValue("profilePicture", null);
    setSelectedImage("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleSelectRole = (value: string) => {
    setRole(value);
    formik.values.role = value;
  };

  const handleOutletId = (value: string) => {
    setOutletId(value);
    formik.values.outletId = value;
  };

  const handleStationId = (value: string) => {
    setStationId(value);
    formik.values.stationId = value;
  };

  if (!session.data) {
    return <DashboardHeader />;
  }

  return session.data?.user.role === "ADMIN" ? (
    <>
      <DashboardHeader />
      <div className="text-md md: mx-auto h-full px-6 pb-10">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Create Employee Form</CardTitle>
            <CardDescription>
              Required all the following except for station
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <FormInput
                name="name"
                label="Nama"
                type="text"
                placeholder="Masukkan nama employee"
                value={formik.values.name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                isError={!!formik.touched.name && !!formik.errors.name}
                error={formik.errors.name}
              />
              <FormInput
                name="email"
                label="Email"
                type="email"
                placeholder="Masukkan email employee"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                isError={!!formik.touched.email && !!formik.errors.email}
                error={formik.errors.email}
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
              <div className="space-y-2">
                <Label htmlFor="profilePicture" className="font-semibold">
                  Profile Picture
                </Label>
                {selectedImage ? (
                  <>
                    <div className="relative h-[150px] w-[150px]">
                      <Image
                        src={selectedImage}
                        alt="Blog thumbnail"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <button
                      onClick={removeSelectedImage}
                      className="text-sm text-red-600"
                    >
                      remove
                    </button>
                  </>
                ) : null}

                <Input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  onChange={onChangeProfilePicture}
                  className="my-1"
                />
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
        </Card>
      </div>
    </>
  ) : (
    <>
      <nav className="fixed z-50 h-20 w-full content-center bg-blue-200 p-3 md:w-[calc(100%-256px)]"></nav>
      <div className="md: mx-auto h-full bg-white p-4 pt-24 text-xl font-bold">
        <>{router.push("/dashboard")}</>
      </div>
    </>
  );
};

export default DashboardCreateEmployeePage;
