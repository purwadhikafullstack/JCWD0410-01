"use client";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import useLogin from "@/hooks/api/auth/useLogin";
import { useFormik } from "formik";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { SpinnerCircularFixed } from "spinners-react";
import { LoginSchema } from "./schemas/LoginSchema";

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

      <div className="mx-auto flex h-screen w-full flex-col p-6 text-sm md:w-[70%]">
        <Link href="/" className="relative h-16 w-full">
          <Image
            src="/logo2.svg"
            alt="FreshNest Laundry Logo"
            fill
            className="object-contain"
          />
        </Link>

        <div className="my-10 flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold md:text-3xl">Welcome Back!</h1>
          <p className="text-neutral-500">
            Ready to make laundry day easier? Log in with your details or
            continue with Google.
          </p>
        </div>

        <div className="space-y-6">
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <FormInput
              name="email"
              label="Email"
              type="email"
              placeholder="Masukkan email anda"
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              isError={!!formik.touched.email && !!formik.errors.email}
              error={formik.errors.email}
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
