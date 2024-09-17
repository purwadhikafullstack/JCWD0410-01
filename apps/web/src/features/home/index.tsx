import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <div className="mx-auto grid h-[100vh] w-[420px] grid-rows-2 border-[1px] text-sm">
      <div className="relative h-full w-full">
        <Image
          src="/laundry.png"
          alt="Whoosh Laundry Logo"
          fill
          className="object-cover object-top"
        />
      </div>
      <div className="box-border flex flex-col justify-between bg-[#29a8d0] p-6 text-white">
        <h1 className="text-4xl font-semibold">
          The Best Solution <br /> For Cleaning Your <br /> Clothes
        </h1>
        <p>
          Find the best and closest laundry place to you. Cleaned with the best
          washing machine so it does not reduce the quality of your clothes
        </p>
        <Link href="/register">
          <Button
            variant="outline"
            className="w-full text-[#29a8d0]"
            type="button"
          >
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
