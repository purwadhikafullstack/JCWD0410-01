"use client";

import { SidebarItems } from "@/types/sidebar";
import { FC } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { IoIosMore, IoMdClose, IoMdMore } from "react-icons/io";
import { LuLogOut, LuMenu, LuUser } from "react-icons/lu";
import { SidebarButtonSheet as SidebarButton } from "./SidebarButton";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { FaUser } from "react-icons/fa6";

interface SidebarDesktopProps {
  sidebarItems: SidebarItems;
}

const SidebarMobile: FC<SidebarDesktopProps> = (props) => {
  const session = useSession();
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="sticky top-0 z-40 flex items-center justify-between bg-white p-4 shadow">
          <Link href="/" className="relative h-14 w-32">
            <Image
              src="/logo2.svg"
              alt="FreshNest Laundry Logo"
              fill
              className="object-contain"
            />
          </Link>
          <Button size="icon" variant="ghost">
            <LuMenu size={22} />
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="p-4" hideClose>
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
              <IoMdClose size={16} />
            </Button>
          </SheetClose>
        </SheetHeader>
        <div className="h-full">
          <div className="mt-5 flex w-full flex-col gap-1">
            {props.sidebarItems.links.map((link, index) => (
              <Link key={index} href={link.href}>
                <SidebarButton
                  variant={pathname === link.href ? "secondary" : "ghost"}
                  icon={link.icon}
                  className="w-full rounded-full"
                >
                  {link.label}
                </SidebarButton>
              </Link>
            ))}
          </div>
          <div className="absolute bottom-4 left-0 w-full px-1">
            <Separator className="absolute -top-3 left-0 w-full" />
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost" className="w-full justify-start py-1">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={session.data?.user.profilePicture}
                          className="object-cover"
                        />
                        <AvatarFallback>
                          <FaUser />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col text-left text-xs">
                        <span>{session.data?.user.name}</span>
                        <span className="font-light">
                          {session.data?.user.email}
                        </span>
                      </div>
                    </div>
                    <IoMdMore size={18} />
                  </div>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="mb-2 p-2">
                <div className="flex flex-col space-y-2">
                  <Link href="/dashboard">
                    <SidebarButton icon={LuUser} className="w-full">
                      Profile
                    </SidebarButton>
                  </Link>

                  {session && (
                    <SidebarButton
                      icon={LuLogOut}
                      className="w-full"
                      onClick={() => signOut()}
                    >
                      Log Out
                    </SidebarButton>
                  )}
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarMobile;
