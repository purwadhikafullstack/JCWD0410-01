"use client";

import React from "react";
import DashboardPickupOrdersPage from "..";
import TestPage from "@/components/TestPage";
import useGetPickupOrdersDrivers from "@/hooks/api/pickup/useGetPickupOrdersDrivers";

const DashboardPickupOrdersOngoingPage = () => {
  return (
    <>
      <DashboardPickupOrdersPage />
      <TestPage status={"ONGOING"} callback={useGetPickupOrdersDrivers} />
    </>
  );
};

export default DashboardPickupOrdersOngoingPage;
