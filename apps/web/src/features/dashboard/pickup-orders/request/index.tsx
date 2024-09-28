"use client";

import React from "react";
import DashboardPickupOrdersPage from "..";
import TestPage from "@/components/TestPage";
import useGetPickupOrdersDrivers from "@/hooks/api/pickup/useGetPickupOrdersDrivers";

const DashboardPickupOrdersRequestPage = () => {
  return (
    <>
      <DashboardPickupOrdersPage />
      <TestPage status={"REQUEST"} callback={useGetPickupOrdersDrivers} />
    </>
  );
};

export default DashboardPickupOrdersRequestPage;
