"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import DashboardPickupOrdersDriversPage from "./drivers";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardPickupOrdersAdminsPage from "./admins";

const DashboardPickupOrdersPage = () => {
  const session = useSession();
  const router = useRouter();

  if (!session.data) {
    return <DashboardHeader />;
  }

  if (session.data.user.role === "DRIVER") {
    return <DashboardPickupOrdersDriversPage />;
  } else if (
    session.data.user.role === "ADMIN" ||
    session.data.user.role === "OUTLET_ADMIN"
  ) {
    return <DashboardPickupOrdersAdminsPage />;
  } else {
    return (
      <>
        <nav className="fixed z-50 h-20 w-full content-center bg-blue-200 p-3 md:w-[calc(100%-256px)]"></nav>
        <div className="md: mx-auto h-full bg-white p-4 pt-24 text-xl font-bold">
          <>{router.push("/dashboard")}</>
        </div>
      </>
    );
  }
};

export default DashboardPickupOrdersPage;
