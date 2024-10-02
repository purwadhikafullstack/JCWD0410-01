import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TbCalendarStar, TbHome } from "react-icons/tb";

const SidebarDashboard = () => {
  return (
    <div className="fixed hidden w-64 bg-sky-600 md:block z-50">
      <Link href="/">
        <Image
          src="/logo2.svg"
          alt="Description"
          className="m-auto h-20 w-40 object-cover py-2"
          width={160}
          height={80}
        />
      </Link>
      <div className="h-screen bg-blue-200">
        <p className="p-2 pl-4 text-xl font-bold text-blue2">Dashboard</p>
        <Link href="/dashboard/users/employees">
          <div className="flex items-center justify-start space-x-2 p-2 pl-4 text-sm font-semibold hover:bg-sky-600 hover:text-blue2">
            <span>
              <TbHome />
            </span>
            <span>Users</span>
          </div>
        </Link>
        <Link href="/dashboard/active-events" className="hover:text-black1">
          <div className="hover:bg-blue3 flex items-center justify-start space-x-2 rounded-full p-2 pl-4 text-sm font-semibold hover:text-blue2">
            <span>
              <TbCalendarStar />
            </span>
            <span>Events</span>
          </div>
        </Link>
        <Link href="/dashboard/transactions" className="hover:text-black1">
          <div className="hover:bg-blue3 flex items-center justify-start space-x-2 rounded-full p-2 pl-4 text-sm font-semibold hover:text-blue2">
            <span>
              <TbCalendarStar />
            </span>
            <span>Transactions</span>
          </div>
        </Link>
        <hr className="mx-2 border-blue2"></hr>
        <p className="p-2 pl-4 text-xl font-bold text-blue1">Account</p>
        <Link href="/profile" className="hover:text-black1">
          <div className="hover:bg-blue3 flex items-center justify-start space-x-2 rounded-full p-2 pl-4 text-sm font-semibold hover:text-blue2">
            <span>
              <TbHome />
            </span>
            <span>Profile</span>
          </div>
        </Link>
        <Link href="/dashboard/notification" className="hover:text-black1">
          <div className="hover:bg-blue3 flex items-center justify-start space-x-2 rounded-full p-2 pl-4 text-sm font-semibold hover:text-blue2">
            <span>
              <TbHome />
            </span>
            <span>Notification</span>
          </div>
        </Link>
        <Link
          href="/dashboard/pickup-orders/ongoing"
          className="hover:text-black1"
        >
          <div className="hover:bg-blue3 flex items-center justify-start space-x-2 rounded-full p-2 pl-4 text-sm font-semibold hover:text-blue2">
            <span>
              <TbHome />
            </span>
            <span>Pickup Orders</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SidebarDashboard;
