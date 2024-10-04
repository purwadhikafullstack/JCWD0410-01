"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserWithAddress } from "@/hooks/api/admin/useGetCustomers";
import { UserWithEmployee } from "@/hooks/api/admin/useGetEmployees";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { CiUser } from "react-icons/ci";
import { FaCircleXmark } from "react-icons/fa6";
import { IoMdCheckmarkCircle } from "react-icons/io";

export const employeesColumns: ColumnDef<UserWithEmployee>[] = [
  {
    accessorKey: "employee.outlet.name",
    header: "Outlet",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "employee.employeeStations",
    header: "Stations",
    cell: ({ row }) => {
      let employeeStation = "";
      if (row.original.employee.employeeStations.length !== 0) {
        row.original.employee.employeeStations.forEach((station) => {
          employeeStation += station.station.name + " ";
        });
      }
      return (
        <div className="line-clamp-2 max-w-[20ch] break-words">
          {employeeStation}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      let name = "No Name";
      if (row.original.name) {
        name = row.original.name;
      }
      return (
        <div className="line-clamp-2 max-w-[20ch] break-words">{name}</div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phoneNumber",
    header: "Number",
    cell: ({ row }) => {
      let phone = "No Phone Number";
      if (row.original.phoneNumber) {
        phone = row.original.phoneNumber;
      }
      return (
        <div className="line-clamp-2 max-w-[20ch] break-words">{phone}</div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.email)}
            >
              Copy Email
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(
                  user.phoneNumber || "No Phone Number",
                )
              }
            >
              Copy Phone Number
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/dashboard/users/${user.id}`}>View user</Link>
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
