import { Skeleton } from "@/components/ui/skeleton";

const EventCardSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-40 rounded-xl bg-slate-200" />
      <div className="space-y-2">
        <Skeleton className="h-4 bg-slate-200" />
        <Skeleton className="h-4 w-[150px] bg-slate-200" />
        <Skeleton className="h-4 w-[150px] bg-slate-200" />
      </div>
    </div>
  );
};

export default EventCardSkeleton;