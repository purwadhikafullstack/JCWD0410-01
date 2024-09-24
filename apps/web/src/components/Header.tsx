"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuLogOut, LuMenu } from "react-icons/lu";
import { MdArrowForwardIos, MdClose } from "react-icons/md";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CiUser } from "react-icons/ci";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const { data: session } = useSession();
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

        {session?.user.id ? (
          <div className="hidden md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger>
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

                  <div className="text-sm">{session.user.name}</div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  <Link href={`/profile/${session.user.id}`}>Profile Saya</Link>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Daftar Alamat</DropdownMenuItem>
                <DropdownMenuItem>Daftar Pesanan</DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="flex items-center gap-2 text-red-600"
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

        <div className="flex md:hidden">
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
                    <div className="flex items-center justify-between">
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

                        <Link href={`/profile/${session.user.id}`}>
                          {session.user.name}
                        </Link>
                      </div>
                      <MdArrowForwardIos size={18} />
                    </div>
                    <hr />
                    <Link href="">Daftar Alamat</Link>
                    <Link href="">Daftar Pesanan</Link>

                    <hr />
                  </div>
                </>
              )}

              <div className="flex flex-col gap-4 text-neutral-600">
                <Link href="/outlet-kami">Outlet Kami</Link>
                <Link href="/layanan-kami">Layanan & Harga</Link>
                <Link href="">Pesan Sekarang</Link>
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
