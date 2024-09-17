"use client";

import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();

  const isPathname = pathname === "/login" || pathname.includes("/register");

  if (isPathname) {
    return null;
  }
  return <div>Header</div>;
};
