"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

  const handleGoogleSignIn = async () => {
    await signIn("google");
  };

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
        <div className="relative h-24 w-full">
          <Image
            src="/image.png"
            alt="Whoosh Laundry Logo"
            fill
            className="object-contain"
          />
        </div>

        <div className="mt-10 space-y-10">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-3xl font-semibold">Create Account</h1>
            <p className="text-neutral-500">
              Fill your email or register with your google account
            </p>
          </div>

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
            onClick={handleGoogleSignIn}
          >
            <FcGoogle size={24} />
            <p>Sign Up with Google</p>
          </Button>

          <div className="flex items-center justify-center gap-1">
            <p>Already have an account?</p>
            <Link href="" className="font-semibold text-[#36bbe3]">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
