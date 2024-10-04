"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiUser } from "react-icons/ci";
import {
  LuHome,
  LuLogOut,
  LuMenu,
  LuShoppingCart,
  LuUser2,
} from "react-icons/lu";
import { MdArrowForwardIos, MdClose, MdVerified } from "react-icons/md";
import { Button } from "./ui/button";

export const Header = () => {
  const { data: session } = useSession();
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
    <div className="sticky top-0 z-10 border-b-[1px] bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
        <div className="hidden items-center gap-8 text-sm text-neutral-600 md:flex">
          <Link href="/" className="relative h-14 w-32">
            <Image
              src="/logo2.svg"
              alt="FreshNest Laundry Logo"
              fill
              className="object-contain"
            />
          </Link>
          <Link href="/outlet-kami">Outlet Kami</Link>
          <Link href="/layanan-kami">Layanan & Harga</Link>
          <Link href="/request">Buat Pesanan</Link>
        </div>

        {session?.user.id ? (
          <div className="hidden md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex items-center gap-3">
                  <div className="text-sm">{session.user.name}</div>
                  <Avatar>
                    <AvatarImage
                      src={session.user.profilePicture}
                      alt="@shadcn"
                      className="object-cover"
                    />
                    <AvatarFallback>
                      <CiUser size={24} />
                    </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="flex flex-col gap-1 font-normal">
                  <div className="flex items-center gap-1">
                    <p className="font-semibold">{session.user.name}</p>{" "}
                    <MdVerified color="#37bae3" />
                  </div>
                  <p className="text-neutral-500">{session.user.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={`/profile`}>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <LuUser2 />
                    <p>Profile Saya</p>
                  </DropdownMenuItem>
                </Link>
                <Link href={`/address`}>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <LuHome />
                    <Link href={`/address`}>Alamat Saya</Link>
                  </DropdownMenuItem>
                </Link>
                <Link href={`/request`}>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <LuShoppingCart />
                    <Link href="/request">Buat Pesanan</Link>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="flex items-center gap-2"
                >
                  <LuLogOut />
                  <div>Logout</div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
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
        )}

        <div className="flex w-full items-center justify-between md:hidden">
          <Link href="/" className="relative h-14 w-32">
            <Image
              src="/logo2.svg"
              alt="FreshNest Laundry Logo"
              fill
              className="object-contain"
            />
          </Link>

          <Drawer>
            <DrawerTrigger>
              <LuMenu size={28} className="text-neutral-600" />
            </DrawerTrigger>
            <DrawerContent className="flex space-y-6 p-6">
              <div className="flex justify-between">
                <Link href="/" className="relative h-14 w-32">
                  <Image
                    src="/logo2.svg"
                    alt="FreshNest Laundry Logo"
                    fill
                    className="object-contain"
                  />
                </Link>
                <DrawerClose>
                  <MdClose size={24} />
                </DrawerClose>
              </div>

              {session && (
                <>
                  <div className="flex flex-col gap-4">
                    <Link
                      className="flex items-center justify-between"
                      href={`/profile`}
                    >
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage
                            src={session.user.profilePicture}
                            alt="@shadcn"
                            className="object-cover"
                          />
                          <AvatarFallback>
                            <CiUser size={24} />
                          </AvatarFallback>
                        </Avatar>

                        {session.user.name}
                      </div>
                      <MdArrowForwardIos size={18} />
                    </Link>

                    <hr />
                    <Link href="/address">Alamat Saya</Link>
                    <Link href="">Pesanan Saya</Link>

                    <hr />
                  </div>
                </>
              )}

              <div className="flex flex-col gap-4 text-neutral-600">
                <Link href="/outlet-kami">Outlet Kami</Link>
                <Link href="/layanan-kami">Layanan & Harga</Link>
                <Link href="/request">Buat Pesanan</Link>
              </div>

              <hr />
              {session ? (
                <div className="flex items-center gap-2 text-red-600">
                  <h3 onClick={() => signOut()}>Logout</h3>

                  <LuLogOut />
                </div>
              ) : (
                <div className="flex flex-col gap-4 text-neutral-600">
                  <Link href="/login">Login</Link>
                  <Link href="/register">Register</Link>
                </div>
              )}
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
};
