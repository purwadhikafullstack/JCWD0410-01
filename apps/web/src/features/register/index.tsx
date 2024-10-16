"use client";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import useRegister from "@/hooks/api/auth/useRegister";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { SpinnerCircularFixed } from "spinners-react";
import { RegisterSchema } from "./schemas/RegisterSchema";

const RegisterPage = () => {
  const { mutateAsync: register, isPending } = useRegister();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      await register(values);
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
        <Link href="/" className="relative h-14">
          <Image
            src="/logo2.svg"
            alt="FreshNest Laundry Logo"
            fill
            className="object-contain"
          />
        </Link>

        <div className="flex justify-center">
          <div className="md:w-[70%]">
            <div className="mb-10 flex flex-col gap-2 text-center">
              <h1 className="text-2xl font-semibold md:text-3xl">
                Create Account
              </h1>
              <p className="text-neutral-500">
                Register with your email or quickly sign up via Google and let
                us handle your laundry needs.
              </p>
            </div>
            <div className="space-y-6">
              <form className="space-y-6" onSubmit={formik.handleSubmit}>
                <FormInput
                  name="email"
                  label="Email"
                  type="text"
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
                    "Register"
                  )}
                </Button>
              </form>

              <div className="grid grid-cols-5 items-center">
                <hr className="col-span-2" />
                <p className="text-center text-neutral-500">or</p>
                <hr className="col-span-2" />
              </div>

              <Button
                variant="outline"
                className="items-cen flex w-full justify-center gap-2"
                onClick={() => signIn("google")}
              >
                <FcGoogle size={24} />
                <p>Sign Up with Google</p>
              </Button>

              <div className="flex items-center justify-center gap-1">
                <p>Already have an account?</p>
                <Link href="/login" className="font-semibold underline">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
