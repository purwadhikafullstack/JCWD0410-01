"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const PickupOrdersHeader = () => {
  const pathname = usePathname();
  const unclicked =
    "rounded-2xl px-3 py-2 hover:bg-blue2 w-28 text-center font-semibold";
  const clicked =
    "rounded-2xl bg-blue2 px-3 py-2 w-28 text-center font-semibold";

  return (
    <nav className="fixed z-50 h-20 w-full content-center bg-blue-200 p-3 md:w-[calc(100%-256px)]">
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
  );
};

export default PickupOrdersHeader;
