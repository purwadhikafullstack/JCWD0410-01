"use client";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import useResetPassword from "@/hooks/api/auth/useResetPassword";
import { useFormik } from "formik";
import Image from "next/image";
import { FC } from "react";
import { SpinnerCircularFixed } from "spinners-react";
import { ResetPasswordSchema } from "./schemas/ResetPasswordSchema";
import Link from "next/link";
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

      <div className="mx-auto flex h-screen w-full flex-col gap-20 p-6 text-sm">
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
                Reset Your Password
              </h1>
              <p className="text-neutral-500">
                Enter a new password to regain access to your account. Let’s get
                you back to FreshNest laundry services!
              </p>
            </div>

            <div className="space-y-6">
              <form className="space-y-6" onSubmit={formik.handleSubmit}>
                <FormInput
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Masukkan password anda"
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
                  placeholder="Konfirmasi password anda"
                  value={formik.values.confirmPassword}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  isError={
                    !!formik.touched.confirmPassword &&
                    !!formik.errors.confirmPassword
                  }
                  error={formik.errors.confirmPassword}
                />

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
      </div>
    </div>
  );
};

export default ResetPasswordPage;
