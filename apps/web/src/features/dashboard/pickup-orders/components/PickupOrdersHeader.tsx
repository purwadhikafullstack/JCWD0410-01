"use client";

import DashboardHeader from "@/components/DashboardHeader";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PickupOrdersHeader = () => {
  const pathname = usePathname();
  const unclicked =
    "rounded-full px-2 py-1 md:px-3 md:py-2 hover:bg-blue2 w-28 text-center font-semibold";
  const clicked =
    "rounded-full px-2 py-1 bg-blue2 md:px-3 md:py-2 w-28 text-white text-md text-center font-semibold";

  return (
    <div>
      <DashboardHeader />
      <nav className="mx-6 content-center rounded-md bg-[#e5f3f5] p-4 text-sm shadow">
        {/* <div className="text-sm text-gray-500 mb-2">{pathname}</div> */}
        <div className="flex justify-evenly gap-2 md:justify-normal">
          {pathname === "/dashboard/pickup-orders/ongoing" ? (
            <Link href="/dashboard/pickup-orders/ongoing" className={clicked}>
              Ongoing
            </Link>
          ) : (
            <Link href="/dashboard/pickup-orders/ongoing" className={unclicked}>
              Ongoing
            </Link>
          )}
          {pathname === "/dashboard/pickup-orders/request" ? (
            <Link href="/dashboard/pickup-orders/request" className={clicked}>
              Request
            </Link>
          ) : (
            <Link href="/dashboard/pickup-orders/request" className={unclicked}>
              Request
            </Link>
          )}
          {pathname === "/dashboard/pickup-orders/history" ? (
            <Link href="/dashboard/pickup-orders/history" className={clicked}>
              History
            </Link>
          ) : (
            <Link href="/dashboard/pickup-orders/history" className={unclicked}>
              History
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default PickupOrdersHeader;
