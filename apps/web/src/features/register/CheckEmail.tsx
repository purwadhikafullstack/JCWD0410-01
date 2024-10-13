import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CheckEmail = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#e5f3f6]">
      <div className="flex w-80 flex-col items-center justify-center gap-4 rounded-md bg-white p-6 text-sm shadow-md">
        <div className="relative h-40 w-full">
          <Image
            src="/email.png"
            alt="Email Logo"
            fill
            className="object-contain"
          />
        </div>
        <h2 className="font text-lg font-semibold">Thanks</h2>
        <p className="text-neutral-500">Please check your email to verify</p>
        <Link href="/login" className="w-full text-center">
          <Button className="w-[70%]">Login</Button>
        </Link>
        <Link href="/">Back to home</Link>
      </div>
    </div>
  );
};

export default CheckEmail;
