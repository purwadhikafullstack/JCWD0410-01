"use client";

import React from "react";
import DashboardPickupOrdersPage from "..";
import TestPage from "@/components/TestPage";
import useGetPickupOrdersDrivers from "@/hooks/api/pickup/useGetPickupOrdersDrivers";

const DashboardPickupOrdersHistoryPage = () => {
  return (
    <>
      <DashboardPickupOrdersPage />
      <TestPage status={"HISTORY"} callback={useGetPickupOrdersDrivers} />
      <div></div>
    </>
  );
};

export default DashboardPickupOrdersHistoryPage;
