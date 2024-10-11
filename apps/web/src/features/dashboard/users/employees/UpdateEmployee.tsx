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
import useGetEmployee from "@/hooks/api/admin/useGetEmployee";
import useUpdateEmployee from "@/hooks/api/admin/useUpdateEmployee";

import useGetOutlets from "@/hooks/api/outlet/useGetOutlets";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ChangeEvent, FC, useRef, useState } from "react";
import { SpinnerCircularFixed } from "spinners-react";
// import { UpdateUserSchema } from "../schemas/UpdateUserSchhema";

interface UpdateEmployeeProps {
  userId: number;
}

const UpdateEmployeePage: FC<UpdateEmployeeProps> = ({ userId }) => {
  const { data } = useGetEmployee(userId);
  const session = useSession();
  const [selectedImage, setSelectedImage] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: updateEmployee, isPending } = useUpdateEmployee(userId);
  const { data: outlets } = useGetOutlets({ take: 10 });
  const stationId = data?.employee.employeeStations
    ? undefined
    : data?.employee.employeeStations.stationId;

  const formik = useFormik({
    initialValues: {
      profilePicture: data?.profilePicture,
      oldPassword: null,
      password: null,
      confirmPassword: null,
      phoneNumber: data?.phoneNumber,
      name: data?.name,
      email: data?.email,
      role: data?.role,
      stationId,
      outletId: data?.employee.outletId,
    },
    // validationSchema: UpdateUserSchema,
    onSubmit: async (values) => {
      const updatedValues = {
        profilePicture:
          values.profilePicture !== data?.profilePicture
            ? values.profilePicture
            : undefined,
        oldPassword: values.oldPassword ? values.oldPassword : undefined,
        password: values.password ? values.password : undefined,
        confirmPassword: values.confirmPassword
          ? values.confirmPassword
          : undefined,
        phoneNumber:
          values.phoneNumber !== data?.phoneNumber
            ? values.phoneNumber
            : undefined,
        name: values.name !== data?.name ? values.name : undefined,
        email: values.email !== data?.email ? values.email : undefined,
        role: values.role !== data?.role ? values.role : undefined,
        stationId:
          values.stationId != data?.employee.employeeStations.stationId
            ? values.stationId
            : undefined,
        oultetId:
          values.outletId != data?.employee.outletId
            ? values.outletId
            : undefined,
      };

      console.log(updatedValues);

      await updateEmployee(updatedValues);
    },
    enableReinitialize: true,
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
    formik.setFieldValue("role", value); // Menggunakan formik.setFieldValue
  };

  const handleOutletId = (value: string) => {
    formik.setFieldValue("outletId", value); // Menggunakan formik.setFieldValue
  };

  const handleStationId = (value: string) => {
    formik.setFieldValue("stationId", value); // Menggunakan formik.setFieldValue
  };

  if (!session.data) {
    return <DashboardHeader />;
  }

  return session.data?.user.role === "ADMIN" ? (
    <>
      <div className="text-md mx-auto h-full p-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Update Employee Form</CardTitle>
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
                label="Nomor Handphone"
                type="text"
                placeholder="Masukkan phoneNumber employee"
                value={formik.values.phoneNumber}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                isError={
                  !!formik.touched.phoneNumber && !!formik.errors.phoneNumber
                }
                error={formik.errors.phoneNumber}
              />

              <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                <FormInput
                  name="oldPassword"
                  label="Password Lama"
                  type="password"
                  placeholder="Masukkan password lama"
                  value={formik.values.oldPassword}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  isError={
                    !!formik.touched.oldPassword && !!formik.errors.oldPassword
                  }
                  error={formik.errors.oldPassword}
                />
                <FormInput
                  name="password"
                  label="Password Baru"
                  type="password"
                  placeholder="Masukkan password untuk employee"
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  isError={
                    !!formik.touched.password && !!formik.errors.password
                  }
                  error={formik.errors.password}
                />
                <FormInput
                  name="confirmPassword"
                  label="Konfirmasi Password"
                  type="password"
                  placeholder="Konfirmasi password baru"
                  value={formik.values.confirmPassword}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  isError={
                    !!formik.touched.confirmPassword &&
                    !!formik.errors.confirmPassword
                  }
                  error={formik.errors.confirmPassword}
                />
              </div>

              <div>
                <Label htmlFor="role">Role</Label>

                <Select
                  onValueChange={handleSelectRole}
                  value={formik.values.role}
                >
                  <SelectTrigger>
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

                <Select
                  onValueChange={handleOutletId}
                  value={formik.values.outletId}
                >
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
                  value={formik.values.stationId && formik.values.stationId} // Bind ke formik value
                  disabled={formik.values.role !== "WORKER"}
                >
                  <SelectTrigger className="">
                    {formik.values.role !== "WORKER" ? null : (
                      <SelectValue placeholder="Station" />
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

              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <SpinnerCircularFixed size={16} color="#fff" />
                ) : (
                  "Update Employee"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  ) : (
    <div>Unauthorized</div>
  );
};

export default UpdateEmployeePage;
