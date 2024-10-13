"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { UserWithAddress } from "@/hooks/api/admin/useGetCustomers";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { CiUser } from "react-icons/ci";
import { FaCircleXmark } from "react-icons/fa6";
import { IoMdCheckmarkCircle } from "react-icons/io";

export const customersColumns: ColumnDef<UserWithAddress>[] = [
  {
    accessorKey: "profilePicture",
    header: "Profile",
    cell: ({ row }) => {
      const src = row.getValue("profilePicture")
        ? String(row.getValue("profilePicture"))
        : "";
      return (
        <Avatar className="ml-3">
          <AvatarImage src={src} alt="@shadcn" className="object-cover" />
          <AvatarFallback>
            <CiUser size={24} />
          </AvatarFallback>
        </Avatar>
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
    accessorKey: "addresses.address",
    header: "Primary Address",
    cell: ({ row }) => {
      let address = "No Address";
      if (row.original.addresses) {
        if (row.original.addresses[0]) {
          address = row.original.addresses[0].address;
        }
      }
      return (
        <div className="line-clamp-2 max-w-[20ch] break-words">{address}</div>
      );
    },
  },
  {
    accessorKey: "isVerified",
    header: "Verification",
    cell: ({ row }) => {
      const verified = row.getValue<boolean>("isVerified");
      return verified ? (
        <span className="flex items-center text-green-500">
          <IoMdCheckmarkCircle className="mr-1" /> Verified
        </span>
      ) : (
        <span className="flex items-center text-red-500">
          <FaCircleXmark className="mr-1" /> Unverified
        </span>
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
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
