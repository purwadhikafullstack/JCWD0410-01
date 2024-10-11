"use client";

import { SidebarItems } from "@/types/sidebar";
import { PropsWithChildren } from "react";
import { FaTshirt } from "react-icons/fa";
import { FaCartShopping, FaStore, FaUsers } from "react-icons/fa6";
import { IoPeople } from "react-icons/io5";
import { useMediaQuery } from "usehooks-ts";
import SidebarDesktop from "./SidebarDesktop";
import SidebarMobile from "./SidebarMobile";
import { MdDeliveryDining } from "react-icons/md";

const sidebarItems: SidebarItems = {
  links: [
    {
      label: "Customer",
      href: "/dashboard/users/customers",
      icon: FaUsers,
    },
    {
      label: "Employee",
      href: "/dashboard/users/employees",
      icon: IoPeople,
    },
    { label: "Outlet", href: "/dashboard/outlet", icon: FaStore },
    {
      label: "Laundry Item",
      href: "/dashboard/laundry-item",
      icon: FaTshirt,
    },
    {
      label: "Orders",
      href: "/dashboard/orders",
      icon: FaCartShopping,
    },
    {
      label: "Pickup Orders",
      href: "/dashboard/pickup-orders",
      icon: MdDeliveryDining,
    },
  ],
};

const LayoutDashboard = ({ children }: PropsWithChildren) => {
  const isDesktop = useMediaQuery("(min-width: 640px)", {
    initializeWithValue: false,
  });

  return (
    <>
      {isDesktop ? (
        <SidebarDesktop sidebarItems={sidebarItems} />
      ) : (
        <SidebarMobile sidebarItems={sidebarItems} />
      )}

      <div className="min-h-screen bg-[#fafafa] md:ml-64 md:mt-0 md:w-[calc(100%-256px)]">
        {children}
      </div>
    </>
  );
};

export default LayoutDashboard;
