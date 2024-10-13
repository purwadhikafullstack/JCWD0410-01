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
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { CiUser } from "react-icons/ci";
import { FaCircleXmark } from "react-icons/fa6";
import { IoMdCheckmarkCircle } from "react-icons/io";

export const userColumns: ColumnDef<UserWithAddress>[] = [
  {
    accessorKey: "profilePicture",
    header: "Profile",
    cell: ({ row }) => {
      const src = row.getValue("profilePicture")
        ? String(row.getValue("profilePicture"))
        : "";
      return (
        <Avatar>
          <AvatarImage src={src} alt="@shadcn" className="object-cover" />
          <AvatarFallback>
            <CiUser size={24} />
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phoneNumber",
    header: "Number",
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
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/dashboard/users/${user.id}`}>View user</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
