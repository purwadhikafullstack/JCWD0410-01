"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import useDeleteUser from "@/hooks/api/admin/useDeleteUser";
import { UserWithEmployee } from "@/hooks/api/admin/useGetEmployees";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { IoWarningOutline } from "react-icons/io5";

export const employeesColumns: ColumnDef<UserWithEmployee>[] = [
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
    accessorKey: "employee.outlet.name",
    header: "Outlet",
  },
  {

    accessorKey: "deleteAction",
    header: "Delete",
    cell: ({ row }) => {
      const { mutateAsync } = useDeleteUser();

      return (
        <div>
          <AlertDialog>
            <AlertDialogTrigger>
              <span className="flex cursor-pointer items-center text-red-500">
                <IoWarningOutline className="mr-1 text-red-500" /> Delete User
              </span>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to delete this user?</AlertDialogTitle>
                <AlertDialogDescription>
                  {}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={()=>{mutateAsync(Number(row.original.id)); window.location.reload()}}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
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
