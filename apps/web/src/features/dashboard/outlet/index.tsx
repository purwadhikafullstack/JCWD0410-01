"use client";

import AlertDialogDemo from "@/components/AlertDialog";
import DashboardHeader from "@/components/DashboardHeader";
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
import { useMediaQuery } from "usehooks-ts";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const th = ["Name", "Tyoe", "Address", "Action"];

const OutletDashboardPage = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)", {
    initializeWithValue: false,
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQueryPage = searchParams.get("page") || "1";
  const [page, setPage] = useState(parseInt(currentQueryPage));

  const { data, isPending, refetch } = useGetOutlets({
    take: 5,
    page,
  });

  const onPageChange = ({ selected }: { selected: number }) => {
    const newPage = selected + 1;
    setPage(newPage);
    refetch();
    router.push(`?page=${newPage}`);
  };

  const { mutateAsync: deleteOutlet, isPending: pendingDelete } =
    useDeleteOutlet();

  const handleDeleteOutlet = async (outletId: number) => {
    await deleteOutlet(outletId);
    refetch();
  };

  if (isPending && isDesktop) {
    return <TableSkeleton />;
  }

  if (!data) {
    return <h1>Outlet not found</h1>;
  }

  return (
    <>
      <DashboardHeader />
      <div className="space-y-6 px-6 pb-10">
        <div className="flex items-center justify-between rounded-md bg-[#e5f3f6] p-4 shadow">
          <h3 className="text-xl font-semibold text-[#37bae3]">Outlet</h3>
          <Link href="/dashboard/outlet/tambah-outlet">
            <Button className="flex items-center gap-1 rounded-full">
              <FaPlus />
              Add <p className="hidden md:inline-block"> Outlet</p>
            </Button>
          </Link>
        </div>
        {isDesktop ? (
          <section className="rounded-md bg-white py-2 shadow">
            <Table>
              <TableCaption>Total outlet : {data.meta.total}</TableCaption>
              <TableHeader>
                <TableRow>
                  {th.map((item, index) => {
                    return (
                      <TableHead className="px-4" key={index}>
                        {item}
                      </TableHead>
                    );
                  })}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data.map((outlet) => (
                  <TableRow key={outlet.id}>
                    <TableCell className="px-4 font-medium">
                      {outlet.name}
                    </TableCell>
                    <TableCell className="px-4 font-medium">
                      {outlet.type}
                    </TableCell>
                    <TableCell className="px-4 font-medium">
                      {outlet.address}
                    </TableCell>
                    <TableCell className="flex items-center gap-3">
                      <Link href={`/dashboard/outlet/edit-outlet/${outlet.id}`}>
                        <Button variant="outline">Edit</Button>
                      </Link>
                      <AlertDialogDemo
                        classname="bg-red-500 text-white px-4 py-2 rounded-md"
                        action={"Hapus"}
                        title="Are you sure?"
                        description="This action cannot be undone. It will permanently delete the outlet data from the database."
                        onclick={() => handleDeleteOutlet(outlet.id)}
                        disabled={pendingDelete}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>
        ) : (
          <>
            {data?.data.map((outlet) => (
              <Card key={outlet.id}>
                <div className="flex flex-row items-center justify-between bg-[#e5f3f6] p-4">
                  <span className="font-semibold">{outlet.name}</span>
                  <Badge>{outlet.type}</Badge>
                </div>
                <div className="space-y-2 p-4">
                  <div>{outlet.address}</div>
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/dashboard/outlet/edit-outlet/${outlet.id}`}>
                      <Button variant="outline">Edit</Button>
                    </Link>
                    <AlertDialogDemo
                      classname="bg-red-500 text-white px-4 py-1.5 rounded-md"
                      action={"Delete"}
                      title="Are you sure?"
                      description="This action cannot be undone. It will permanently delete the outlet data from the database."
                      onclick={() => handleDeleteOutlet(outlet.id)}
                      disabled={pendingDelete}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </>
        )}
        <div className="flex justify-center">
          <Pagination
            total={data.meta.total}
            limit={data.meta.take}
            onChangePage={onPageChange}
            page={page}
          />
        </div>
      </div>
    </>
  );
};

export default OutletDashboardPage;
