"use client";

import AlertDialogDemo from "@/components/AlertDialog";
import Pagination from "@/components/Pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useDeleteLaundryItem from "@/hooks/api/laundry-item/useDeleteLaundryItem";
import useGetLaundryItems from "@/hooks/api/laundry-item/useGetLaundryItems";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import TableSkeleton from "../outlet/component/TableSkeleton";
import AddItem from "./Components/AddItem";
import EditItem from "./Components/EditItem";
import DashboardHeader from "@/components/DashboardHeader";

const LaundryItemPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQueryPage = searchParams.get("page") || "1";
  const [page, setPage] = useState(Number(currentQueryPage));

  const { data, isPending, refetch } = useGetLaundryItems({
    take: 10,
    sortOrder: "desc",
    page: page,
  });

  const onPageChange = ({ selected }: { selected: number }) => {
    const newPage = selected + 1;
    setPage(newPage);
    router.push(`?page=${newPage}`);
  };

  const { mutateAsync: deleteLaundryItem, isPending: pendingDelete } =
    useDeleteLaundryItem();

  const handleDeleteLaundryItem = async (laundryItemId: number) => {
    await deleteLaundryItem(laundryItemId);
    refetch();
  };

  if (isPending) {
    return <TableSkeleton />;
  }

  if (!data) {
    return <h1>Item tidak ditemukan</h1>;
  }

  return (
    <div>
      <DashboardHeader />
      <div className="space-y-6 px-6">
        <div className="flex items-center justify-between rounded-md bg-[#e5f3f6] p-4 shadow">
          <h3 className="text-xl font-semibold text-[#37bae3]">Laundry Item</h3>
          <AddItem />
        </div>
        <section className="rounded-md border-[1px] bg-white py-2">
          <Table>
            <TableCaption>Total item: {data.meta.total}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="px-4">Nama</TableHead>
                <TableHead className="px-4">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="px-4 font-medium">
                    {item.name}
                  </TableCell>
                  <TableCell className="flex items-center gap-3 px-4">
                    <EditItem laundryItemId={item.id} />
                    <AlertDialogDemo
                      classname="bg-red-500 text-white px-4 py-2 rounded-md"
                      action="Hapus"
                      title="Apakah Anda yakin?"
                      description="Tindakan ini tidak dapat dibatalkan. Ini akan menghapus data outlet secara permanen dari database."
                      onclick={() => handleDeleteLaundryItem(item.id)}
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
    </div>
  );
};

export default LaundryItemPage;
