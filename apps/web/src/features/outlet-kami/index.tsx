"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useGetOutlets from "@/hooks/api/outlet/useGetOutlets";
import Image from "next/image";
import CardSkeleton from "./components/CardSkeleton";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Pagination from "@/components/Pagination";

const OutletPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQueryPage = searchParams.get("page") || "1";
  const [page, setPage] = useState(Number(currentQueryPage));

  const { data, isPending } = useGetOutlets({ page, take: 6 });
  const onPageChange = ({ selected }: { selected: number }) => {
    const newPage = selected + 1;
    setPage(newPage);
    router.push(`?page=${newPage}`); // Update URL dengan query page
  };

  // Skeleton loading
  if (isPending) {
    return <CardSkeleton />;
  }

  // Handle jika data tidak ditemukan
  if (!data) {
    return <h1>Outlet tidak ditemukan</h1>;
  }
  return (
    <div>
      <div className="bg-[#e5f3f6]">
        <div className="mx-auto max-w-7xl space-y-10 px-6 py-10 md:py-20">
          <div className="grid grid-cols-1 items-center justify-between gap-10 md:grid-cols-2">
            <h1 className="pb-2 text-3xl font-semibold text-[#37bae3] md:text-4xl">
              Temukan Outlet FreshNest Laundry Terdekat
            </h1>
            <p className="text-neutral-500">
              Kami memiliki jaringan outlet FreshNest Laundry yang tersebar di
              berbagai lokasi untuk memudahkan Anda mengakses layanan kami.
              Setiap outlet kami dilengkapi dengan teknologi canggih dan tim
              profesional yang siap memberikan layanan laundry berkualitas
              tinggi.
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl space-y-10 bg-white px-6 py-10 md:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {data?.data.map((outlet) => {
            return (
              <Card key={outlet.id}>
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src="/laundry2.png"
                    alt="Whoosh Laundry Logo"
                    fill
                    className="rounded-t-md object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-neutral-600">
                    {outlet.name}
                  </CardTitle>
                  <CardDescription>{outlet.address}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
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

export default OutletPage;
