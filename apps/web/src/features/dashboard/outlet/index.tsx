"use client";

import AlertDialogDemo from "@/components/AlertDialog";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useDeleteOutlet from "@/hooks/api/outlet/useDeleteOutlet";
import useGetOutlets from "@/hooks/api/outlet/useGetOutlets";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import TableSkeleton from "./component/TableSkeleton";

const OutletDashboardPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQueryPage = searchParams.get("page") || "1";
  const [page, setPage] = useState(Number(currentQueryPage));

  const { data, isPending, refetch } = useGetOutlets({
    take: 10,
  });

  const onPageChange = ({ selected }: { selected: number }) => {
    const newPage = selected + 1;
    setPage(newPage);
    router.push(`?page=${newPage}`);
  };

  const { mutateAsync: deleteOutlet, isPending: pendingDelete } =
    useDeleteOutlet();

  const handleDeleteOutlet = async (outletId: number) => {
    await deleteOutlet(outletId);
    refetch();
  };

  if (isPending) {
    return <TableSkeleton />;
  }

  if (!data) {
    return <h1>Outlet tidak ditemukan</h1>;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6 md:p-10">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold">Daftar Outlet</h3>
        <Link href="/dashboard/outlet/tambah-outlet">
          <Button className="flex items-center gap-1">
            <FaPlus /> <p>Tambah Outlet</p>
          </Button>
        </Link>
      </div>
      <section className="rounded-md border-[1px] bg-white">
        <Table>
          <TableCaption>Total outlet saat ini: {data.meta.total}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Latitude</TableHead>
              <TableHead>Longitude</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.map((outlet) => (
              <TableRow key={outlet.id}>
                <TableCell className="font-medium">{outlet.id}</TableCell>
                <TableCell className="font-medium">{outlet.name}</TableCell>
                <TableCell className="font-medium">{outlet.type}</TableCell>
                <TableCell className="font-medium">{outlet.latitude}</TableCell>
                <TableCell className="font-medium">
                  {outlet.longitude}
                </TableCell>
                <TableCell className="flex items-center gap-3">
                  <Link href={`/dashboard/outlet/edit-outlet/${outlet.id}`}>
                    <Button variant="outline">Edit</Button>
                  </Link>
                  <AlertDialogDemo
                    classname="bg-red-500 text-white px-4 py-2 rounded-md"
                    action="Hapus"
                    title="Apakah Anda yakin?"
                    description="Tindakan ini tidak dapat dibatalkan. Ini akan menghapus data outlet secara permanen dari database."
                    onclick={() => handleDeleteOutlet(outlet.id)}
                    disabled={pendingDelete}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
      <div className="flex justify-center">
        <Pagination
          total={data.meta.total}
          limit={data.meta.take}
          onChangePage={onPageChange}
          page={page}
        />
      </div>
    </div>
  );
};

export default OutletDashboardPage;
