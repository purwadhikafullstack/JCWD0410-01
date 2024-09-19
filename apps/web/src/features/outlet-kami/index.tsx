import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const OutletPage = () => {
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
          <Card>
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
                Senayan - Pusat
              </CardTitle>
              <CardDescription>
                No.41 Blok S, Jl. Senayan, RT.8/RW.5, Rw. Bar., Kec. Kby. Baru,
                Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12180
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
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
                Senayan - Pusat
              </CardTitle>
              <CardDescription>
                No.41 Blok S, Jl. Senayan, RT.8/RW.5, Rw. Bar., Kec. Kby. Baru,
                Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12180
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
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
                Senayan - Pusat
              </CardTitle>
              <CardDescription>
                No.41 Blok S, Jl. Senayan, RT.8/RW.5, Rw. Bar., Kec. Kby. Baru,
                Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12180
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
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
                Senayan - Pusat
              </CardTitle>
              <CardDescription>
                No.41 Blok S, Jl. Senayan, RT.8/RW.5, Rw. Bar., Kec. Kby. Baru,
                Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12180
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
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
                Senayan - Pusat
              </CardTitle>
              <CardDescription>
                No.41 Blok S, Jl. Senayan, RT.8/RW.5, Rw. Bar., Kec. Kby. Baru,
                Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12180
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OutletPage;
