import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

const TableSkeletonPure = () => {
  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6 md:p-10">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold">
          <Skeleton className="h-6 w-32" />
        </h3>
      </div>

      <section className="rounded-md border-[1px] bg-white">
        <Skeleton className="h-12 w-full border-b-[1px]" />
        <div className="space-y-2">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex items-center justify-between p-2">
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-24" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-12" />
                <Skeleton className="h-8 w-12" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-center">
        <Skeleton className="h-10 w-48" />
      </div>
    </div>
  );
};

export default TableSkeletonPure;
