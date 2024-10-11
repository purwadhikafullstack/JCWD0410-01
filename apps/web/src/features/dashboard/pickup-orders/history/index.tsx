"use client";

import TestPage from "@/components/TestPage";
import useGetPickupOrdersDrivers from "@/hooks/api/pickup/useGetPickupOrdersDrivers";
import PickupOrdersHeader from "../components/PickupOrdersHeader";
import PickupOrderTable from "../components/PickupOrderTable";

const DashboardPickupOrdersHistoryPage = () => {
  return (
    <>
      <PickupOrdersHeader />
      <div className="text-md md: mx-auto h-full px-6">
        <PickupOrderTable
          status={"HISTORY"}
          callback={useGetPickupOrdersDrivers}
        />
      </div>
      <TestPage status={"HISTORY"} callback={useGetPickupOrdersDrivers} />
    </>
  );
};

export default DashboardPickupOrdersHistoryPage;
