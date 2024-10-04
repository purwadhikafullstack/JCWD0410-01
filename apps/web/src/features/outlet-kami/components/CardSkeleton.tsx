import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CardSkeleton = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl space-y-10 px-6 py-10 md:py-20">
        <div className="flex items-center justify-between text-[#37bae3]">
          <Skeleton className="h-8 w-36" />
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <Skeleton className="h-48 w-full rounded-t-md" />
              <CardHeader>
                <Skeleton className="h-6 w-40" />
                <Skeleton className="mt-2 h-4 w-24" />
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
