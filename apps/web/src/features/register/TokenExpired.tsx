import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TokenExpired = () => {
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
        <h2 className="font text-lg">Oh No!</h2>
        <p className="text-center text-neutral-500">
          Your token is expired. Please register your email again
        </p>
        <Link href="/register" className="w-full text-center">
          <Button className="w-[80%]">Register</Button>
        </Link>
        <Link href="/">Back to home</Link>
      </div>
    </div>
  );
};

export default TokenExpired;
