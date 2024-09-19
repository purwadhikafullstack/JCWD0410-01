"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { LuMenu } from "react-icons/lu";

export const Header = () => {
  const pathname = usePathname();

  const isPathname = pathname === "/login" || pathname.includes("/register");

  if (isPathname) {
    return null;
  }
  return (
    <div className="sticky top-0 z-10 border-b-[1px] bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
        <Link href="/" className="relative h-14 w-32">
          <Image
            src="/logo2.svg"
            alt="FreshNest Laundry Logo"
            fill
            className="object-contain"
          />
        </Link>

        <div className="hidden gap-8 text-sm text-neutral-600 md:flex">
          <Link href="/outlet-kami">Outlet Kami</Link>
          <Link href="/layanan-kami">Layanan & Harga</Link>
          <Link href="">Pesan Sekarang</Link>
        </div>
        <div className="hidden gap-2 md:flex">
          <Link href="/login">
            <Button className="px-7">Login</Button>
          </Link>
          <Link href="/register">
            <Button
              className="border-[1px] border-[#37bae3] text-[#37bae3]"
              variant="outline"
            >
              Register
            </Button>
          </Link>
        </div>

        <div className="flex text-neutral-600 md:hidden">
          <LuMenu size={28} />
        </div>
      </div>
    </div>
  );
};
