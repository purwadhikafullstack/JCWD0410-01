"use client";

import {
  Bell,
  Bookmark,
  Home,
  List,
  LogOut,
  LucideIcon,
  Mail,
  Menu,
  MoreHorizontal,
  Settings,
  User,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import { SidebarButtonSheet as SidebarButton } from "./ui/sidebar-button";

interface SidebarItems {
  links: Array<{
    label: string;
    href: string;
    icon?: LucideIcon;
  }>;
  extras?: ReactNode;
}

interface SidebarMobileProps {
  sidebarItems: SidebarItems;
}

const Sidebar = () => {
  const pathname = usePathname();

  const sidebarItems: SidebarItems = {
    links: [
      { label: "Home", href: "/", icon: Home },
      { label: "Notifications", href: "/item/notifications", icon: Bell },
      { label: "Messages", href: "/item/messages", icon: Mail },
      {
        href: "/item/lists",
        icon: List,
        label: "Lists",
      },
      {
        href: "/item/bookmarks",
        icon: Bookmark,
        label: "Bookmarks",
      },
      {
        href: "/item/communities",
        icon: Users,
        label: "Communities",
      },
      {
        href: "/item/profile",
        icon: User,
        label: "Profile",
      },
    ],
    extras: (
      <div className="flex flex-col gap-2">
        <SidebarButton icon={MoreHorizontal} className="w-full">
          More
        </SidebarButton>
        <SidebarButton
          className="w-full justify-center text-white"
          variant="default"
        >
          Tweet
        </SidebarButton>
      </div>
    ),
  };

  return (
    <div className="block md:hidden fixed">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="ghost" className="fixed left-3 top-3">
            <Menu size={20} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="px-3 py-4">
          <SheetHeader className="flex flex-row items-center justify-between space-y-0">
            <span className="mx-3 text-lg font-semibold text-foreground">
              Twitter
            </span>
            <SheetClose asChild>
              <Button className="h-7 w-7 p-0" variant="ghost">
                <X size={15} />
              </Button>
            </SheetClose>
          </SheetHeader>
          <div className="h-full">
            <div className="mt-5 flex w-full flex-col gap-1">
              {sidebarItems.links.map((link, idx) => (
                <Link key={idx} href={link.href}>
                  <SidebarButton
                    variant={pathname === link.href ? "secondary" : "ghost"}
                    icon={link.icon}
                    className="w-full"
                  >
                    {link.label}
                  </SidebarButton>
                </Link>
              ))}
              {sidebarItems.extras}
            </div>
            <div className="absolute bottom-4 left-0 w-full px-1">
              <Separator className="absolute -top-3 left-0 w-full" />
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start">
                    <div className="flex w-full items-center justify-between">
                      <div className="flex gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src="" />
                          <AvatarFallback>Profile</AvatarFallback>
                        </Avatar>
                        <span>Username</span>
                      </div>
                      <MoreHorizontal size={20} />
                    </div>
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="mb-2 p-2">
                  <div className="mt-2 flex flex-col space-y-2">
                    <Link href="/">
                      <SidebarButton
                        size="sm"
                        icon={Settings}
                        className="w-full"
                      >
                        Account Settings
                      </SidebarButton>
                    </Link>
                    <SidebarButton size="sm" icon={LogOut} className="w-full">
                      Log Out
                    </SidebarButton>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Sidebar;
