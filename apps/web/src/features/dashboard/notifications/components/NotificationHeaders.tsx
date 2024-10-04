"use client";

import { usePathname } from "next/navigation";

const NotificationHeader = () => {
  const pathname = usePathname();
  const unclicked =
    "rounded-2xl px-3 py-2 hover:bg-blue2 w-28 text-center font-semibold";
  const clicked =
    "rounded-2xl bg-blue2 px-3 py-2 w-28 text-center font-semibold";

  return (
    <nav className="fixed z-50 h-20 w-full content-center bg-blue-200 p-3 md:w-[calc(100%-256px)]">
    </nav>
  );
};

export default NotificationHeader;
