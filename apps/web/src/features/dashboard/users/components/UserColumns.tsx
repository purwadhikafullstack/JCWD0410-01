"use client";

import { UserWithAddress } from "@/hooks/api/admin/useGetCustomers";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { FaCircleXmark } from "react-icons/fa6";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CiUser } from "react-icons/ci";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

// id              Int      @id @default(autoincrement())
//   email           String   @unique
//   name            String?
//   password        String?
//   phoneNumber     String?  @unique
//   profilePicture  String?
//   token           String?
//   lastEditBy      Int      @default(0)
//   provider        Provider @default(CREDENTIALS)
//   role            Role     @default(CUSTOMER)
//   isVerified      Boolean  @default(false)
//   isPasswordReset Boolean  @default(false)
//   isDeleted       Boolean  @default(false)
//   createdAt       DateTime @default(now())

export const userColumns: ColumnDef<UserWithAddress>[] = [
  {
    accessorKey: "profilePicture",
    header: "Profile",
    cell: ({ row }) => {
      const src = row.getValue("profilePicture")
        ? String(row.getValue("profilePicture"))
        : "";
      return (
        // <div className="relative h-10 w-10 overflow-hidden rounded-full border-[1px] border-neutral-200">
        //   <Image
        //     src={src}
        //     alt="@shadcn"
        //     fill
        //     className="absolute inset-0 h-full w-full object-cover"
        //   />

        // </div>
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
