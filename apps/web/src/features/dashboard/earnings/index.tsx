"use client";

import DashboardHeader from "@/components/DashboardHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetOrdersChart from "@/hooks/api/order/useGetOrdersChart";
import useGetOutlets from "@/hooks/api/outlet/useGetOutlets";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { getDaysInMonth } from "date-fns";
import { useSession } from "next-auth/react";
import { useState } from "react";
import ChartEvents from "./components/ChartEvents";
import { Loader2 } from "lucide-react";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
);

const DashboardEarningsPage = () => {
  const session = useSession();
  const [outletId, setOutletId] = useState("");
  const now = new Date();
  const [filterMonth, setFilterMonth] = useState(`${now.getMonth() + 1}`);
  const [filterYear, setFilterYear] = useState(`${now.getFullYear()}`);
  const month = filterMonth ? Number(filterMonth) - 1 : now.getMonth();
  const year = filterYear ? Number(filterYear) : now.getFullYear();

  function getDaysInSpecificMonth(year: number, month: number): number {
    const date = new Date(year, month);
    return getDaysInMonth(date);
  }
  const daysInMonth = getDaysInSpecificMonth(year, month);

  const handleChangeFilterMonth = (value: string) => {
    setFilterMonth(value);
  };
  const handleChangeFilterYear = (value: string) => {
    setFilterYear(value);
  };

  const { data: outlets } = useGetOutlets({ take: 12 });

  const result = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  const { data, isPending, refetch } = useGetOrdersChart({
    filterMonth,
    filterYear,
    outletId,
  });

  const handleOutletId = (value: string) => {
    setOutletId(value);
    if (value === "0") {
      setOutletId("");
    }
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (!session.data) {
    return <DashboardHeader />;
  }

  if (
    session.data.user.role === "ADMIN" ||
    session.data.user.role === "OUTLET_ADMIN"
  ) {
    if (isPending) {
      return (
        <>
          <DashboardHeader />
          <Loader2 className="mx-auto" />
        </>
      );
    }
    if (data) {
      return (
        <>
          <DashboardHeader />
          <div className="px-6">
            <div className="flex h-16 items-center justify-between rounded-md bg-[#e5f3f6] p-4 shadow">
              <h3 className="text-xl font-semibold text-[#37bae3]">Earnings</h3>
            </div>
          </div>
          <div className="text-md md: mx-auto h-full p-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">
                  {months[Number(filterMonth) - 1]}
                </CardTitle>
                <CardDescription className="flex justify-between">
                  <div>Total: {result.format(data.totalIncome)}</div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`mb-4 grid grid-cols-1 gap-4 ${session.data.user.role === "ADMIN" ? `md:grid-cols-5` : "md:grid-cols-4"}`}
                >
                  <Select
                    name="month"
                    onValueChange={handleChangeFilterMonth}
                    defaultValue={filterMonth}
                  >
                    <SelectTrigger className="min-w-40">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">January</SelectItem>
                      <SelectItem value="2">February</SelectItem>
                      <SelectItem value="3">March</SelectItem>
                      <SelectItem value="4">April</SelectItem>
                      <SelectItem value="5">May</SelectItem>
                      <SelectItem value="6">June</SelectItem>
                      <SelectItem value="7">July</SelectItem>
                      <SelectItem value="8">August</SelectItem>
                      <SelectItem value="9">September</SelectItem>
                      <SelectItem value="10">October</SelectItem>
                      <SelectItem value="11">November</SelectItem>
                      <SelectItem value="12">December</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    name="sortYear"
                    onValueChange={handleChangeFilterYear}
                    defaultValue="2024"
                  >
                    <SelectTrigger className="min-w-40">
                      <SelectValue placeholder={"Sort By"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                    </SelectContent>
                  </Select>
                  {session.data?.user.role === "ADMIN" ? (
                    <Select onValueChange={handleOutletId}>
                      <SelectTrigger className="md:w-[200px]">
                        <SelectValue placeholder="Outlet" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Outlet</SelectLabel>
                          <SelectItem value="0">ALL</SelectItem>
                          {outlets?.data.map((outlet, index) => {
                            return (
                              <SelectItem value={String(outlet.id)} key={index}>
                                {outlet.name}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  ) : null}
                </div>
                <div className="rounded-3xl bg-white p-6">
                  <ChartEvents
                    dataSet={data?.incomeDaily}
                    daysInMonth={daysInMonth}
                    label="Income"
                    title="Daily Income"
                  />
                </div>
                <div className="rounded-3xl bg-white p-6">
                  <ChartEvents
                    dataSet={data?.incomeMonthly}
                    label="Income"
                    title="Monthly Income"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      );
    } else {
      return (
        <>
          <DashboardHeader />
          <div>No data</div>
        </>
      );
    }
  }
};

export default DashboardEarningsPage;
