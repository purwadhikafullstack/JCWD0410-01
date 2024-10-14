import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

const HeroSection = () => {
  return (
    <div className="space-y-4 bg-[#fbfbfb] md:pt-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 p-6 text-neutral-800 md:grid-cols-5">
        <h1 className="col-span-3 text-6xl font-semibold">
          Your Perfect Laundry Care with
          <span className="text-[#37bae3]"> FreshNest</span>
        </h1>
        <div className="col-span-2 flex flex-col gap-4">
          <p>
            From everyday wear to delicate fabrics, FreshNest Laundry provides
            expert care and advanced cleaning technology to keep your clothes
            fresh and clean. Experience fast, reliable, and eco-friendly laundry
            services you can trust.
          </p>
          <Link href="/request">
            <Button
              variant="outline"
              className="flex w-fit items-center gap-2 border-[#37bae3] text-[#37bae3]"
            >
              <span>Order Now</span>
              <FaArrowRight />
            </Button>
          </Link>
        </div>
      </div>
      <div className="relative col-span-1 h-[500px] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1520434901111-8e9bcb42c628?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Whoosh Laundry Logo"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default HeroSection;
