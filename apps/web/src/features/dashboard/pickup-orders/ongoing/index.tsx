"use client";

import TestPage from "@/components/TestPage";
import useGetPickupOrdersDrivers from "@/hooks/api/pickup/useGetPickupOrdersDrivers";
import PickupOrdersHeader from "../components/PickupOrdersHeader";
import PickupOrderTable from "../components/PickupOrderTable";

const DashboardPickupOrdersOngoingPage = () => {
  return (
    <>
      <PickupOrdersHeader />
      <div className="text-md md: mx-auto h-full px-6">
        <PickupOrderTable
          status={"ONGOING"}
          callback={useGetPickupOrdersDrivers}
        />
      </div>
      <TestPage status={"ONGOING"} callback={useGetPickupOrdersDrivers} />
    </>
  );
};

export default DashboardPickupOrdersOngoingPage;
