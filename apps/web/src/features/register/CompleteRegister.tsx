"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useCompleteRegistration from "@/hooks/api/auth/useCompleteRegistration";
import { useFormik } from "formik";
import Image from "next/image";
import { FC } from "react";
import { SpinnerCircularFixed } from "spinners-react";
import { CompleteRegisterSchema } from "./schemas/CompleteRegisterSchema";
import FormInput from "@/components/FormInput";

interface CompleteRegisterPageProps {
  email: string;
  token: string;
}

const CompleteRegisterPage: FC<CompleteRegisterPageProps> = ({
  email,
  token,
}) => {
  const { mutateAsync: completeRegistration, isPending } =
    useCompleteRegistration(token);
  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    validationSchema: CompleteRegisterSchema,
    onSubmit: async (values) => {
      await completeRegistration(values);
    },
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="relative h-full w-full">
        <Image
          src="/laundry.png"
          alt="Laundry picture"
          fill
          className="object-cover"
        />
      </div>
      <div className="mx-auto flex min-h-[100vh] w-full flex-col p-6 text-sm md:w-[70%]">
        <div className="relative h-16 w-full">
          <Image
            src="/logo2.svg"
            alt="FreshNest Laundry Logo"
            fill
            className="object-contain"
          />
        </div>

        <div className="mt-10 space-y-10">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-3xl font-semibold">Create Account</h1>
            <p className="text-neutral-500">complete your registration</p>
          </div>
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <FormInput
              name="name"
              label="Nama"
              type="text"
              placeholder="Masukkan nama anda"
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
              placeholder=""
              value={email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              isError={false}
              error={""}
            />

            <FormInput
              name="password"
              label="Password"
              type="password"
              placeholder="Masukkan password anda"
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              isError={!!formik.touched.password && !!formik.errors.password}
              error={formik.errors.password}
            />

            <Button
              className="w-full bg-[#36bbe3]"
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <div className="flex items-center gap-1">
                  <SpinnerCircularFixed size={20} />
                  <p className="text-sm">Loading</p>
                </div>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompleteRegisterPage;
