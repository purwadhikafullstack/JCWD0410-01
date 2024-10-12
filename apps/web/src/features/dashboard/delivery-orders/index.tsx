"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardDeliveryOrdersDriversPage from "./drivers";
import DashboardDeliveryOrdersAdminsPage from "./admins";

const DashboardPickupOrdersPage = () => {
  const session = useSession();
  const router = useRouter();

  if (!session.data) {
    return <DashboardHeader />;
  }

  if (session.data.user.role === "DRIVER") {
    return <DashboardDeliveryOrdersDriversPage />;
  } else if (session.data.user.role === "ADMIN" || session.data.user.role === "OUTLET_ADMIN") {
    return <DashboardDeliveryOrdersAdminsPage />
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
