import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Price = () => {
  return (
    <div className="py-10">
      <div className="mx-auto max-w-7xl space-y-6 p-6 text-center">
        <h2 className="text-3xl font-bold text-[#37bae3]">Harga</h2>
        <p className="mt-2 text-lg text-neutral-600">
          Nikmati layanan lengkap dengan satu harga transparan untuk semua jenis
          laundry.
        </p>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
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
              <CardTitle className="text-left text-xl text-neutral-600">
                Layanan Laundry
              </CardTitle>
              <CardDescription className="text-left">
                Harga ini berlaku untuk semua jenis layanan, termasuk washing,
                dry cleaning, dan ironing. Kami memastikan setiap cucian
                mendapatkan perhatian dan perawatan terbaik sehingga pakaian
                Anda tetap awet dan nyaman dipakai.
                {/* <ul className="mt-4 list-inside list-disc text-left text-gray-600">
                  <li>Wash and Fold</li>
                  <li>Dry Cleaning</li>
                  <li>Iron and Pressing</li>
                </ul> */}
              </CardDescription>
              <h2 className="text-right text-xl font-semibold text-[#37bae3]">
                Rp 10.000/kg
              </h2>
            </CardHeader>
          </Card>

          <Card>
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src="/image.png"
                alt="Whoosh Laundry Logo"
                fill
                className="rounded-t-md object-cover"
              />
            </div>

            <CardHeader>
              <CardTitle className="text-left text-xl text-neutral-600">
                Layanan Pengantaran
              </CardTitle>
              <CardDescription className="text-left">
                Pengambilan dan pengantaran langsung ke rumah Anda dengan
                layanan yang cepat dan efisien. Kami menggunakan armada
                pengiriman yang terjadwal dan tepat waktu, memastikan pengalaman
                Anda bersama FreshNest Laundry selalu memuaskan.
              </CardDescription>
              <h2 className="text-right text-xl font-semibold text-[#37bae3]">
                Rp 5.000/km
              </h2>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Price;
