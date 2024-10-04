"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const UsersHeader = () => {
  const session = useSession();
  const router = useRouter();
  const authorized =
    session.data?.user.role === "ADMIN" ||
    session.data?.user.role === "OUTLET_ADMIN";
  const pathname = usePathname();
  const unclicked =
    "rounded-2xl px-3 py-2 hover:bg-blue2 w-28 text-center font-semibold";
  const clicked =
    "rounded-2xl bg-blue2 px-3 py-2 w-28 text-center font-semibold";

  return (
    <nav className="fixed z-50 h-20 w-full content-center bg-blue-200 p-3 md:w-[calc(100%-256px)]">
      {/* <div className="text-sm text-gray-500 mb-2">{pathname}</div> */}
      <div className="flex justify-evenly gap-2 md:justify-normal">
        {session.data?.user.role === "ADMIN" ||
          session.data?.user.role === "OUTLET_ADMIN"}
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
            hidden={!session.data}
          >
            Employees
          </button>
        ) : (
          <button
          onClick={() => router.push("/dashboard/users/employees")}
            className={unclicked}
            hidden={!session.data}
          >
            Employees
          </button>
        )}
      </div>
    </nav>
  );
};

export default UsersHeader;
