import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useGetOutlets from "@/hooks/api/outlet/useGetOutlets";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Outlet = () => {
  const { data, isPending } = useGetOutlets({ take: 3 });

  return (
    <div className="bg-[#fbfbfb]">
      <div className="mx-auto max-w-7xl space-y-8 px-6 py-20 text-neutral-800">
        <div className="space-y-4">
          <Badge># Our Branches</Badge>

          <div className="flex justify-between gap-2 md:items-center">
            <h3 className="text-4xl font-semibold">
              Serving You Wherever You Are
            </h3>
            <Link href="/outlets" className="flex items-center">
              <Button
                variant="outline"
                className="flex w-fit items-center gap-2 border-[#37bae3] text-[#37bae3]"
              >
                <p>See more</p>
                <FaArrowRight />
              </Button>
            </Link>
          </div>

          <p className="text-neutral-500">
            Discover FreshNest Laundry outlets across Yogyakarta, each offering
            exceptional service to keep your clothes fresh and clean. Whether
            it’s our quick wash service, precise ironing, or convenient pickup
            and delivery, we’re here to make laundry day hassle-free.
          </p>
        </div>
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
      </div>
    </div>
  );
};

export default Outlet;
