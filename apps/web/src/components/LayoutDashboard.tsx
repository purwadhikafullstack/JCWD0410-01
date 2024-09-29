import Link from "next/link";
import { PropsWithChildren } from "react";
import { TbCalendarStar, TbHome } from "react-icons/tb";

const LayoutDashboard = async ({ children }: PropsWithChildren) => {
  return (
    <div className="flex">
      <div className="sticky w-80 bg-sky-600 shadow-md">
        <Link href="/">
          <img
            src="/logo2.svg"
            alt="Description"
            className="m-auto w-40 h-20 object-cover py-2"
          />
        </Link>
        <div className="h-screen bg-blue-200">
          <p className="p-2 pl-4 text-xl font-bold text-blue2">Dashboard</p>
          <Link href="/dashboard">
            <div className="hover:bg-sky-600 flex items-center justify-start space-x-2 p-2 pl-4 text-sm font-semibold hover:text-blue2">
              <span>
                <TbHome />
              </span>
              <span>Dashboard</span>
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
          <Link href="/dashboard/pickup-orders/ongoing" className="hover:text-black1">
            <div className="hover:bg-blue3 flex items-center justify-start space-x-2 rounded-full p-2 pl-4 text-sm font-semibold hover:text-blue2">
              <span>
                <TbHome />
              </span>
              <span>Pickup Orders</span>
            </div>
          </Link>
        </div>
      </div>
      <div className="w-[100%]">
        <div>{children}</div>
      </div>
    </div>
  );
};

export default LayoutDashboard;
