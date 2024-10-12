"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const UsersHeader = () => {
  const session = useSession();
  const router = useRouter();
  const authorized = session.data?.user.role === "ADMIN";
  const pathname = usePathname();
  const unclicked =
    "rounded-full px-2 py-1 md:px-3 md:py-2 hover:bg-blue2 w-28 text-center font-semibold";
  const clicked =
    "rounded-full px-2 py-1 bg-blue2 md:px-3 md:py-2 w-28 text-white text-md text-center font-semibold";

  return (
    <nav className="mx-6 content-center rounded-md bg-[#e5f3f5] p-4 text-sm shadow">
      {/* <div className="text-sm text-gray-500 mb-2">{pathname}</div> */}
      <div className="flex justify-between gap-2">
        <div className="flex justify-evenly gap-2 md:justify-normal">
          {pathname === "/dashboard/users/customers" ? (
            <button
              onClick={() => router.push("/dashboard/users/customers")}
              className={clicked}
              hidden={!authorized}
            >
              Customers
            </button>
          ) : (
            <button
              onClick={() => router.push("/dashboard/users/customers")}
              className={unclicked}
              hidden={!authorized}
            >
              Customers
            </button>
          )}
          {pathname === "/dashboard/users/employees" ? (
            <button
              onClick={() => router.push("/dashboard/users/employees")}
              className={clicked}
            >
              Employees
            </button>
          ) : (
            <button
              onClick={() => router.push("/dashboard/users/employees")}
              className={unclicked}
            >
              Employees
            </button>
          )}
        </div>
        <button
          onClick={() => router.push("/dashboard/users/employees/create")}
          className="md rounded-2xl bg-white px-2 py-1 text-center font-semibold text-[#38b9e3] shadow md:px-3 md:py-2"
          hidden={!authorized}
        >
          Create Employee
        </button>
      </div>
    </nav>
  );
};

export default UsersHeader;
