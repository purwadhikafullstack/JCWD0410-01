"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FaStoreAlt } from "react-icons/fa";
import { FaBell, FaShirt, FaUser } from "react-icons/fa6";
import { IoPeople } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { MdDeliveryDining } from "react-icons/md";

const SidebarDashboard = () => {
  const session = useSession();
  return (
    <div className="fixed z-50 hidden w-64 items-center border-r-[1px] bg-white md:block">
      <Link href="/dashboard">
        <Image
          src="/logo2.svg"
          alt="Description"
          className="mx-6 h-20 w-40 object-contain py-2"
          width={160}
          height={80}
        />
      </Link>
      <hr />
      <div className="h-screen space-y-10 bg-white p-6 text-sm text-neutral-600">
        <div className="space-y-4">
          <Link
            href="/dashboard"
            className="text-lg font-semibold text-[#37bae3]"
          >
            Dashboard
          </Link>
          <div className="flex flex-col gap-3">
            <Link href="/dashboard/users/employees">
              <div className="flex items-center justify-start gap-2">
                <IoPeople size={18} />
                <span>Employees</span>
              </div>
            </Link>
            <Link href="/dashboard/outlet">
              <div className="flex items-center justify-start gap-3">
                <FaStoreAlt />
                <span>Outlets</span>
              </div>
            </Link>
            <Link href="/dashboard/laundry-item">
              <div className="flex items-center justify-start gap-3">
                <FaShirt />
                <span>Laundry Item</span>
              </div>
            </Link>
          </div>
        </div>
        {/* <hr /> */}
        <div className="space-y-4">
          <Link
            href="/dashboard"
            className="text-lg font-semibold text-[#37bae3]"
          >
            Account
          </Link>
          <div className="flex flex-col gap-3">
            <Link href="/dashboard/profile">
              <div className="flex items-center justify-start gap-3">
                <FaUser />
                <span>Profile</span>
              </div>
            </Link>
            <Link href="/dashboard/notification">
              <div className="flex items-center justify-start gap-3">
                <FaBell />
                <span>Notification</span>
              </div>
            </Link>
            <Link href="/dashboard/pickup-orders/ongoing">
              <div className="flex items-center justify-start gap-3">
                <MdDeliveryDining size={18} />
                <span>Pickup Orders</span>
              </div>
            </Link>
            {session && (
              <button
                className="flex items-center justify-start gap-3"
                onClick={() => signOut()}
              >
                <LuLogOut size={18} />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarDashboard;
