"use client";

import { WorkOrders_Extension } from "@/hooks/api/work/useGetWorkOrdersWorker";
import useUpdateWorkOrderWorker from "@/hooks/api/work/useUpdateWorkOrdersWorker";
import { WorkStatus } from "@/types/work-order";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { useRouter } from "next/navigation";
import { WorkOrders_AdminExtension } from "@/hooks/api/work/useGetWorkOrdersAdmins";

export const workOrderAdminsColumns: ColumnDef<WorkOrders_AdminExtension>[] = [
  {
    accessorKey: "order.orderNumber",
    header: "Order Number",
  },
  {
    accessorKey: "stationId",
    header: "Station",
    cell: ({ row }) => {
      const station = Number(row.original.stationId);
      if (station === 1) {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">Washing</div>
        );
      } else if (station === 2) {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">Ironing</div>
        );
      } else if (station === 3) {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">Packing</div>
        );
      }
    },
  },
  {
    accessorKey: "outlet.name",
    header: "Outlet",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = String(row.original.status);
      if (status === "READY_FOR_WASHING") {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">
            Ready for washing
          </div>
        );
      } else if (status === "BEING_WASHED") {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">Washing</div>
        );
      } else if (status === "WASHING_COMPLETED") {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">
            Washing complete
          </div>
        );
      } else if (status === "READY_FOR_IRONING") {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">
            Ready for Ironing
          </div>
        );
      } else if (status === "BEING_IRONED") {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">Ironing</div>
        );
      } else if (status === "IRONING_COMPLETED") {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">
            Ironing complete
          </div>
        );
      } else if (status === "READY_FOR_PACKING") {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">
            Ready for packing
          </div>
        );
      } else if (status === "BEING_PACKED") {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">Packing</div>
        );
      } else if (status === "PACKING_COMPLETED") {
        return (
          <div className="line-clamp-2 max-w-[20ch] break-all">
            Packing complete
          </div>
        );
      } else if (status === "BYPASSED") {
        if (!row.original.byPassedNote) {
          const router = useRouter();
          return (
            <button onClick={()=>{router.push(`/dashboard/work-orders/bypass/${row.original.id}`)}} className="line-clamp-2 max-w-[20ch] break-all text-blue-400">Bypassed</button>
          );
        } else {
          const router = useRouter();
          return (
            <button onClick={()=>{router.push(`/dashboard/work-orders/bypass/${row.original.id}`)}} className="line-clamp-2 max-w-[20ch] break-all">Bypassed processed</button>
          )
        }
      } else return <div></div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Time of order",
    cell: ({ row }) => {
      const createdAt = format(
        new Date(row.getValue("createdAt")),
        "dd MMM yyyy, HH:mm:ss",
      );
      return <div>{createdAt}</div>;
    },
  },
];
