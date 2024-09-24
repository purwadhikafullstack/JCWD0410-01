"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";

import { ForgotPasswordSchema } from "./schemas/ForgotPasswordSchema";
import useForgotPassword from "@/hooks/api/auth/useForgotPassword";
import Image from "next/image";
import { SpinnerCircularFixed } from "spinners-react";

const ForgotPasswordPage = () => {
  const { mutateAsync: forgotPassword, isPending } = useForgotPassword();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: async (values, { resetForm }) => {
      await forgotPassword(values);
      //setelah di send formnya akan kosong lagi
      resetForm();
    },
  });

  return (
    <div className="grid grid-cols-1 text-neutral-700 md:grid-cols-2">
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

        <div className="my-10 flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold md:text-3xl">
            Forgot Your Password?
          </h1>
          <p className="text-neutral-500">
            Don’t worry! Just enter your email, and we’ll send instructions to
            reset your password. FreshNest is just a step away!
          </p>
        </div>

        <div className="space-y-6">
          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="your email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {!!formik.touched.email && !!formik.errors.email ? (
                <p className="text-xs text-red-500">{formik.errors.email}</p>
              ) : null}
            </div>

            <Button
              className="w-full bg-[#36bbe3]"
              disabled={isPending}
              type="submit"
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

export default ForgotPasswordPage;
