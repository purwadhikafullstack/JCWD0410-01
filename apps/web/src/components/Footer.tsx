"use client";

import { usePathname } from "next/navigation";

export const Footer = () => {
  const pathname = usePathname();

  const isPathname = pathname === "/login" || pathname.includes("/register");

  if (isPathname) {
    return null;
  }
  return <div>Footer</div>;
};
