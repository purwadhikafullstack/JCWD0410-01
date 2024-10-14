"use client";
import { Card, CardContent } from "@/components/ui/card";
import banner1 from "../../../../public/promo1.svg";
import banner2 from "../../../../public/promo2.svg";
import emblaCarouselAutoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useRef } from "react";

const Promo = () => {
  const plugin = useRef(
    emblaCarouselAutoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );

  const banners = [banner1, banner2];
  return (
    <div className="bg-[#f4f4f4]">
      <div className="z-0 mx-auto max-w-7xl py-10 md:py-20">
        <Carousel plugins={[plugin.current]} className="w-full">
          <CarouselContent>
            {banners.map((banner, index) => (
              <CarouselItem key={index}>
                <Card className="">
                  <CardContent className="relative h-[130px] w-full items-center justify-center overflow-hidden p-6 text-center md:h-[400px] md:rounded-lg">
                    <div className="z-0 h-full w-full">
                      <Image alt="banner" src={banner} fill />
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="size-6 opacity-50" />
          <CarouselNext className="size-6 opacity-50" />
        </Carousel>
      </div>
    </div>
  );
};

export default Promo;
