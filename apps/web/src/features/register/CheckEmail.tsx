import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CheckEmail = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex w-80 flex-col items-center justify-center gap-6 rounded-md border-[1px] p-6 text-sm">
        <div className="relative h-40 w-full">
          <Image
            src="/email.png"
            alt="Email Logo"
            fill
            className="object-contain"
          />
        </div>
        <h2 className="font text-lg">Thanks</h2>
        <p className="text-neutral-500">Please check your email to verify</p>
        <Link href="/login" className="w-full text-center">
          <Button className="w-[80%]">Login</Button>
        </Link>
        <Link href="/">Back to home</Link>
      </div>
    </div>
  );
};

export default CheckEmail;
