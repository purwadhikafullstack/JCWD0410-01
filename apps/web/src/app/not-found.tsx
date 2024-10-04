import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="mx-auto flex h-[100vh] max-w-7xl flex-col items-center justify-center gap-6 p-6 text-neutral-700">
      <Image
        src="/404.svg"
        alt="Not found picture"
        width={0}
        height={0}
        className="h-[240px] w-[300px] md:h-[340px] md:w-[400px]"
      />

      <p className="text-center text-sm">
        Sorry, the page you’re looking for does not exist <br />
        please go back to the Home page
      </p>
      <Link href="/">
        <Button>Back to Homepage</Button>
      </Link>
    </div>
  );
};

export default NotFound;
