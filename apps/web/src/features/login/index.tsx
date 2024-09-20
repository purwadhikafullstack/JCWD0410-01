"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useRegister from "@/hooks/api/auth/useRegister";
import { useFormik } from "formik";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { SpinnerCircularFixed } from "spinners-react";
import { LoginSchema } from "./schemas/LoginSchema";
import useLogin from "@/hooks/api/auth/useLogin";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const session = useSession();
  const router = useRouter();
  const { mutateAsync: login, isPending } = useLogin();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      await login(values);
    },
  });

  if (session.data?.user.id) {
    router.replace("/");
  }

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

        <div className="mt-10 space-y-10">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-3xl font-semibold">Welcome Back!</h1>
            <p className="text-neutral-500">
              Ready to make laundry day easier? Log in with your details or
              continue with Google.
            </p>
          </div>

          <form className="space-y-6" onSubmit={formik.handleSubmit}>
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
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                type="password"
                placeholder="your password"
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {!!formik.touched.password && !!formik.errors.password ? (
                <p className="text-xs text-red-500">{formik.errors.password}</p>
              ) : null}
            </div>
            <Link
              href="/forgot-password"
              className="flex justify-end text-xs text-neutral-700"
            >
              Forgot password?
            </Link>

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
          <div className="grid grid-cols-5 items-center">
            <hr className="col-span-2" />
            <p className="text-center text-neutral-500">or</p>
            <hr className="col-span-2" />
          </div>

          <Button
            variant="outline"
            className="items-cen flex w-full justify-center gap-2"
            onClick={async () => {
              await signIn("google");
            }}
          >
            <FcGoogle size={24} />
            <p>Sign In with Google</p>
          </Button>

          <div className="flex items-center justify-center gap-1">
            <p>Dont have an account?</p>
            <Link href="/register" className="font-semibold text-[#36bbe3]">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
