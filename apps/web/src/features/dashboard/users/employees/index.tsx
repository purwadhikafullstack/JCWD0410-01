"use client";

import useGetEmployees from "@/hooks/api/admin/useGetEmployees";
import UsersHeader from "../components/UsersHeader";
import UserTable from "../components/UserTable";
import { useSession } from "next-auth/react";

const DashboardUsersEmployeesPage = () => {
  const session = useSession();
  return session.data?.user.role === "ADMIN" ||
    session.data?.user.role === "OUTLET_ADMIN" ? (
    <>
      <UsersHeader />
      <div className="text-md md: mx-auto h-[2400px] bg-white p-4 pt-24">
        <UserTable callback={useGetEmployees} />
      </div>
    </>
  ) : (
    <>
      <nav className="fixed z-50 h-20 w-full content-center bg-blue-200 p-3 md:w-[calc(100%-256px)]"></nav>
      <div className="md: mx-auto h-[2400px] bg-white p-4 pt-24 text-xl font-bold">
        Unauthorized
      </div>
    </>
  );
};

export default DashboardUsersEmployeesPage;
