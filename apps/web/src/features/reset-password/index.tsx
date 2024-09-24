"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useResetPassword from "@/hooks/api/auth/useResetPassword";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { SpinnerCircularFixed } from "spinners-react";
import { ResetPasswordSchema } from "./schemas/ResetPasswordSchema";
import { FC } from "react";
interface ResetPasswordPageProps {
  token: string;
}

const ResetPasswordPage: FC<ResetPasswordPageProps> = ({ token }) => {
  const { mutateAsync: resetPassword, isPending } = useResetPassword(token);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values) => {
      await resetPassword(values);
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

      <div className="mx-auto flex h-screen w-full flex-col p-6 text-sm md:w-[70%]">
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
            Reset Your Password
          </h1>
          <p className="text-neutral-500">
            Enter a new password to regain access to your account. Let’s get you
            back to FreshNest laundry services!
          </p>
        </div>

        <div className="space-y-6">
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                type="password"
                placeholder="Your Password"
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {!!formik.touched.password && !!formik.errors.password ? (
                <p className="text-xs text-red-500">{formik.errors.password}</p>
              ) : null}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Confirm Password</Label>
              <Input
                name="confirmPassword"
                type="password"
                placeholder="Your Confirm Password"
                value={formik.values.confirmPassword}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {!!formik.touched.confirmPassword &&
              !!formik.errors.confirmPassword ? (
                <p className="text-xs text-red-500">
                  {formik.errors.confirmPassword}
                </p>
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
                "Sign In"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
