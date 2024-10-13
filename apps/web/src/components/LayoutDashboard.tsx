"use client";

import { SidebarItems } from "@/types/sidebar";
import { PropsWithChildren } from "react";
import { FaTshirt } from "react-icons/fa";
import {
  FaCartShopping,
  FaStore,
  FaUsers,
  FaCarSide,
  FaMoneyCheckDollar,
} from "react-icons/fa6";
import { FaHotTub } from "react-icons/fa";

import { IoPeople } from "react-icons/io5";
import { useMediaQuery } from "usehooks-ts";
import SidebarDesktop from "./SidebarDesktop";
import SidebarMobile from "./SidebarMobile";
import { MdDeliveryDining } from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";
import { IoIosNotifications } from "react-icons/io";
import { useSession } from "next-auth/react";

const LayoutDashboard = ({ children }: PropsWithChildren) => {
  const session = useSession();
  const isDesktop = useMediaQuery("(min-width: 768px)", {
    initializeWithValue: false,
  });

  if (!session) {
    return <></>;
  }

  const sidebarItems: SidebarItems = {
    links: [
      {
        label: "Notifications",
        href: "/dashboard/notifications",
        icon: IoIosNotifications,
      },
    ],
  };

  if (session.data?.user.role === "ADMIN") {
    sidebarItems.links.unshift(
      { label: "Outlet", href: "/dashboard/outlet", icon: FaStore },
      {
        label: "Earnings",
        href: "/dashboard/earnings",
        icon: FaMoneyCheckDollar,
      },
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
      {
        label: "Orders",
        href: "/dashboard/orders",
        icon: FaCartShopping,
      },
      {
        label: "Pickup Orders",
        href: "/dashboard/pickup-orders",
        icon: FaCarSide,
      },
      {
        label: "Delivery Orders",
        href: "/dashboard/delivery-orders",
        icon: FaCarSide,
      },
      {
        label: "Work Orders",
        href: "/dashboard/work-orders",
        icon: FaHotTub,
      },
      {
        label: "Laundry Item",
        href: "/dashboard/laundry-item",
        icon: FaTshirt,
      },
    );
  }

  if (session.data?.user.role === "OUTLET_ADMIN") {
    sidebarItems.links.unshift(
      {
        label: "Earnings",
        href: "/dashboard/earnings",
        icon: FaMoneyCheckDollar,
      },
      {
        label: "Employee",
        href: "/dashboard/users/employees",
        icon: IoPeople,
      },
      {
        label: "Orders",
        href: "/dashboard/orders",
        icon: FaCartShopping,
      },
      {
        label: "Pickup Orders",
        href: "/dashboard/pickup-orders",
        icon: FaCarSide,
      },
      {
        label: "Delivery Orders",
        href: "/dashboard/delivery-orders",
        icon: FaCarSide,
      },
      {
        label: "Work Orders",
        href: "/dashboard/work-orders",
        icon: FaCarSide,
      },
    );
  }

  if (session.data?.user.role === "WORKER") {
    sidebarItems.links.unshift({
      label: "Work Orders",
      href: "/dashboard/work-orders",
      icon: FaHotTub,
    });
  }

  if (session.data?.user.role === "DRIVER") {
    sidebarItems.links.unshift(      {
      label: "Pickup Orders",
      href: "/dashboard/pickup-orders",
      icon: FaCarSide,
    },
    {
      label: "Delivery Orders",
      href: "/dashboard/delivery-orders",
      icon: FaCarSide,
    },);
  }

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
