"use client";

import { GetNotifications } from "@/hooks/api/notifications/useGetNotifications";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const notificationsColumns: ColumnDef<GetNotifications>[] = [
  {
    accessorKey: "notification.title",
    header: "Title",
    cell: ({ row }) => {
      const title = String(row.original.notification.title);
      return (
        <div className="line-clamp-2 max-w-[25ch] break-words">{title}</div>
      );
    },
  },
  {
    accessorKey: "notification.message",
    header: "Message",
    cell: ({ row }) => {
      const message = String(row.original.notification.message);
      return (
        <div className="line-clamp-2 max-w-[30ch] break-words">{message}</div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Notification time",
    cell: ({ row }) => {
      const createdAt = format(
        new Date(row.getValue("createdAt")),
        "dd MMM yyyy, HH:mm:ss",
      );
      return <div>{createdAt}</div>;
    },
  },
];
