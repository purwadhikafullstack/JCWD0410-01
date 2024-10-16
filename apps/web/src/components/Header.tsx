"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import {
  LuAlertCircle,
  LuHistory,
  LuHome,
  LuLogOut,
  LuMenu,
  LuPlaneLanding,
  LuPlaneTakeoff,
  LuShoppingCart,
  LuUser2,
} from "react-icons/lu";
import { MdArrowForwardIos, MdClose, MdVerified } from "react-icons/md";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import { IoMdClose } from "react-icons/io";

export const Header = () => {
  const { data: session } = useSession();

  const [header, setHeader] = useState(false);
  const scrollHeader = () => {
    if (window.scrollY >= 20) {
      setHeader(true);
    } else {
      setHeader(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHeader);
    return () => {
      window.addEventListener("scroll", scrollHeader);
    };
  }, []);

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
    <div className="sticky top-0 z-10 bg-white shadow transition-shadow duration-300 ease-in-out">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
        <div className="flex items-center gap-14">
          <Link href="/" className="relative hidden h-14 w-32 md:inline-block">
            <Image
              src="/logo2.svg"
              alt="FreshNest Laundry Logo"
              fill
              className="object-contain"
            />
          </Link>
          <div className="hidden items-center gap-8 text-sm text-neutral-600 md:flex">
            <Link href="/outlets">Our Outlets</Link>
            <Link href="/services">Services and Pricing</Link>
            <Link href="/request">Place Order</Link>
          </div>
        </div>

        {session?.user.id ? (
          <div className="hidden md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
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
                    <p className="font-semibold">{session.user.name}</p>
                    {Boolean(session.user.isVerified) === true && (
                      <MdVerified color="#37bae3" />
                    )}
                  </div>
                  <p className="text-neutral-500">{session.user.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={`/profile`}>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <LuUser2 />
                    <p>My Profile</p>
                  </DropdownMenuItem>
                </Link>
                <Link href={`/address`}>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <LuHome />
                    <p>Saved Addresses</p>
                  </DropdownMenuItem>
                </Link>
                <Link href={`/orders`}>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <LuHistory />
                    <p>My Orders</p>
                  </DropdownMenuItem>
                </Link>
                <Link href={`/pickup-orders`}>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <LuPlaneTakeoff />
                    <p>Pickup orders</p>
                  </DropdownMenuItem>
                </Link>
                <Link href={`/delivery-orders`}>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <LuPlaneLanding />
                    <p>Delivery orders</p>
                  </DropdownMenuItem>
                </Link>
                <Link href={`/request`}>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <LuShoppingCart />
                    <p>Place Order</p>
                  </DropdownMenuItem>
                </Link>
                <Link href={`/notifications`}>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <LuAlertCircle />
                    <p>Notification</p>
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

          <Sheet>
            <SheetTrigger>
              <LuMenu size={24} className="text-neutral-600" />
            </SheetTrigger>
            <SheetContent className="space-y-6 p-6" hideClose>
              <SheetHeader className="flex flex-row items-center justify-between space-y-0">
                <Link href="/dashboard" className="relative h-14 w-32">
                  <Image
                    src="/logo2.svg"
                    alt="FreshNest Laundry Logo"
                    fill
                    className="object-contain"
                  />
                </Link>
                <SheetClose asChild>
                  <Button variant="ghost" className="h-7 w-7 p-0">
                    <IoMdClose size={18} />
                  </Button>
                </SheetClose>
              </SheetHeader>
              {session && (
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

                      <div className="flex items-center gap-1">
                        <p className="font-semibold">{session.user.name}</p>
                        {String(session.user.isVerified) === "true" && (
                          <MdVerified color="#37bae3" />
                        )}
                      </div>
                    </div>
                    <MdArrowForwardIos size={16} className="mr-2 p-0" />
                  </Link>

                  <hr />
                  <Link href="/address">Saved Addresses</Link>
                  <Link href="/orders">My Orders</Link>
                  <Link href="/pickup-orders">Pickup Orders</Link>
                  <Link href="/delivery-orders">Delivery Orders</Link>
                  <Link href="/notifications">Notifications</Link>

                  <hr />
                </div>
              )}

              <div className="flex flex-col gap-4 text-neutral-600">
                <Link href="/outlets"> Our Outlets</Link>
                <Link href="/services">Services and Pricing</Link>
                <Link href="/request">Place Order</Link>
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
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};
