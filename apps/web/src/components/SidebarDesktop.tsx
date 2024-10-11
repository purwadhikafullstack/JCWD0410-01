"use client";

import { SidebarItems } from "@/types/sidebar";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { FaUser } from "react-icons/fa6";
import { LuLogOut, LuUser } from "react-icons/lu";
import SidebarButton from "./SidebarButton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import { IoIosMore, IoMdMore } from "react-icons/io";

interface SidebarDesktopProps {
  sidebarItems: SidebarItems;
}

const SidebarDesktop: FC<SidebarDesktopProps> = (props) => {
  const session = useSession();
  const pathname = usePathname();
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 max-w-xs border-r-[1px] bg-[#fdfdfd]">
      <div className="h-full">
        <Link href="/dashboard">
          <Image
            src="/logo2.svg"
            alt="Description"
            className="mx-4 h-20 w-40 object-contain py-3"
            width={160}
            height={80}
          />
        </Link>
        <hr />
        <div className="flex h-full w-full flex-col gap-1 p-4">
          {props.sidebarItems.links.map((link, index) => (
            <Link href={link.href} key={index}>
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
      </div>
      <div className="absolute bottom-3 left-0 w-full px-4">
        <Separator className="absolute -top-3 left-0 w-full" />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start rounded-full px-0 py-1"
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-9 w-9">
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
          </PopoverTrigger>
          <PopoverContent className="mb-2 w-56 rounded-md">
            <div>
              <Link href="/">
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
          </PopoverContent>
        </Popover>
      </div>
    </aside>
  );
};

export default SidebarDesktop;
