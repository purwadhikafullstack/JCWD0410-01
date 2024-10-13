"use client";

import { Button } from "@/components/ui/button";
import { useFormik } from "formik";

import FormInput from "@/components/FormInput";
import useForgotPassword from "@/hooks/api/auth/useForgotPassword";
import Image from "next/image";
import { SpinnerCircularFixed } from "spinners-react";
import { ForgotPasswordSchema } from "./schemas/ForgotPasswordSchema";
import Link from "next/link";

const ForgotPasswordPage = () => {
  const { mutateAsync: forgotPassword, isPending } = useForgotPassword();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: async (values, { resetForm }) => {
      await forgotPassword(values);
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

      <div className="mx-auto flex min-h-[100vh] w-full flex-col gap-20 p-6 text-sm">
        <Link href="/" className="relative h-14 w-full">
          <Image
            src="/logo2.svg"
            alt="FreshNest Laundry Logo"
            fill
            className="object-contain"
          />
        </Link>

        <div>
          <div className="mx-auto md:w-[70%]">
            <div className="mb-10 flex flex-col gap-2 text-center">
              <h1 className="text-2xl font-semibold md:text-3xl">
                Forgot Your Password?
              </h1>
              <p className="text-neutral-500">
                Don’t worry! Just enter your email, and we’ll send instructions
                to reset your password. FreshNest is just a step away!
              </p>
            </div>

            <div className="space-y-6">
              <form className="space-y-6" onSubmit={formik.handleSubmit}>
                <FormInput
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  isError={!!formik.touched.email && !!formik.errors.email}
                  error={formik.errors.email}
                />

                <Button className="w-full" disabled={isPending} type="submit">
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
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
