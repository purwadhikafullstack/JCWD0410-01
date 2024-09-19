import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const Promo = () => {
  return (
    <div className="bg-[#e5f3f7]">
      {/* <div className="mx-auto max-w-7xl p-4 py-10"> */}
      <Carousel className="mx-auto max-w-7xl p-4 py-10">
        <CarouselContent>
          <CarouselItem className="relative h-28 w-full overflow-hidden md:h-96">
            <Image
              src="/promo1.svg"
              alt="Promo"
              fill
              className="rounded-md object-cover"
            />
          </CarouselItem>
          <CarouselItem className="relative h-28 w-full md:h-96">
            <Image
              src="/promo2.svg"
              alt="Promo"
              fill
              className="rounded-md object-contain"
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
    // </div>
  );
};

export default Promo;
