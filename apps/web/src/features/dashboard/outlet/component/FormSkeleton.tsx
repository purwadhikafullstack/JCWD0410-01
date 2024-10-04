import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const FormSkeleton = () => {
  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6 md:p-10">
      <h3 className="text-2xl font-semibold">
        <Skeleton className="h-6 w-32" />
      </h3>

      <form className="space-y-4">
        {/* Nama Outlet Input Skeleton */}
        <div className="space-y-1">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Tipe Outlet Select Skeleton */}
        <div className="space-y-1.5">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Latitude Input Skeleton */}
        <div className="space-y-1">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Longitude Input Skeleton */}
        <div className="space-y-1">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Submit Button Skeleton */}
        <Button type="button" disabled className="w-full md:w-fit">
          <div className="flex items-center gap-1">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-5 w-16" />
          </div>
        </Button>
      </form>
    </div>
  );
};

export default FormSkeleton;
