import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Jumbotron = () => {
  return (
    <div className="bg-[#e5f3f7]">
      <div className="text-md mx-auto grid max-w-7xl grid-cols-1 gap-10 p-4 md:grid-cols-2 md:py-20">
        <div className="box-border flex flex-col justify-center gap-8 text-[#29a8d0]">
          <h1 className="text-5xl font-semibold">
            Kesegaran dan Kualitas, Setiap Cucian
          </h1>

          <p className="text-neutral-500">
            FreshNest Laundry menawarkan perawatan pakaian dengan perhatian dan
            presisi tertinggi. Kami menggunakan mesin canggih dan teknologi
            terbaru untuk memastikan pakaian Anda tetap segar dan berkualitas di
            setiap cucian.
          </p>
          <Link href="/register">
            <Button className="text-white" type="button" size="lg">
              Pesan Sekarang
            </Button>
          </Link>
          <div className="flex justify-between text-neutral-500">
            <div className="flex flex-col">
              <p className="text-3xl text-[#29a8d0]">300</p>
              <p>Customer</p>
            </div>
            <div className="flex flex-col">
              <p className="text-3xl text-[#29a8d0]">5</p>
              <p>Outlet</p>
            </div>
            <div className="flex flex-col">
              <p className="text-3xl text-[#29a8d0]">100%</p>
              <p>Customer Satisfication</p>
            </div>
          </div>
        </div>
        <motion.div
          className="box"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <div className="flex justify-end">
            <div className="relative h-[500px] w-full overflow-hidden">
              <Image
                src="/laundry.png"
                alt="Whoosh Laundry Logo"
                fill
                className="rounded-md object-cover object-top"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Jumbotron;
