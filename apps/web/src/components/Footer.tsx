"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaInstagram, FaRegCopyright, FaTwitter } from "react-icons/fa6";

export const Footer = () => {
  const pathname = usePathname();

  const paths = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/dashboard",
  ];
  const isPathname = paths.some((path) => pathname.startsWith(path));

  if (isPathname) {
    return null;
  }
  return (
    <div className="text-sm text-neutral-500">
      <div className="border-y-[1px] border-neutral-300 bg-[#e5f3f7]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 justify-between gap-8 p-6 md:flex md:grid-cols-5">
          <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
            <Link href="/" className="relative h-20 w-48">
              <Image
                src="/logo2.svg"
                alt="FreshNest Laundry Logo"
                fill
                className="object-contain"
              />
            </Link>
            <p>Clean, Fast, and Reliable for Every Wash</p>
            <div className="flex items-center gap-2 text-xl text-neutral-600">
              <FaTwitter />
              <FaInstagram />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-semibold text-black">Company</p>
            <p>About Us</p>
            <p>Contact Us</p>
            <p>Terms and Conditions</p>
            <p>Privacy Policy</p>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-semibold text-black">Layanan</p>
            <p>Wash and Fold</p>
            <p>Dry Cleaning</p>
            <p>Ironing and Pressing</p>
            <p>Pick Up and Delivery</p>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-semibold text-black">More</p>
            <p>Kemitraan</p>
            <p>Partnership</p>
          </div>
        </div>
      </div>
      <div className="bg-[#e5f3f7] text-sm text-neutral-600">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 p-6 md:flex-row">
          <div className="flex items-center gap-1">
            <FaRegCopyright />
            <p>2024 FreshNest. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
