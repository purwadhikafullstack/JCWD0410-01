import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TokenExpired = () => {
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
        <h2 className="font text-lg font-semibold">Oh No!</h2>
        <p className="text-center text-neutral-500">
          Your token is expired. <br /> Please register your email again
        </p>
        <Link href="/register" className="w-full text-center">
          <Button className="w-[70%]">Register</Button>
        </Link>
        <Link href="/">Back to home</Link>
      </div>
    </div>
  );
};

export default TokenExpired;
