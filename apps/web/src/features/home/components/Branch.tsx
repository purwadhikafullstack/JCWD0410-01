import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useGetOutlets from "@/hooks/api/outlet/useGetOutlets";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Branch = () => {
  const { data } = useGetOutlets({ take: 3 });

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl space-y-10 px-6 py-10 md:py-20">
        <div className="flex items-center justify-between text-[#37bae3]">
          <h1 className="text-3xl font-semibold md:text-4xl">Lokasi Outlet</h1>
          <Link href="/outlet-kami" className="flex items-center">
            <p>Lihat lainnya</p>
            <MdOutlineKeyboardArrowRight size={24} />
          </Link>
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

export default Branch;
