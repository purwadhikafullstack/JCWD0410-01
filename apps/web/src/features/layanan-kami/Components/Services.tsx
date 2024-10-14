import Image from "next/image";
import React from "react";

const Services = () => {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      <h2 className="text-center text-3xl font-bold text-[#37bae3]">
        Services
      </h2>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
        <div className="flex flex-col items-center gap-2 rounded-md border-[1px] border-[#37bae3] p-4">
          <div className="relative h-28 w-28 overflow-hidden">
            <Image
              src="/wash.svg"
              alt="Wash Icon"
              fill
              className="object-contain"
            />
          </div>
          <h3 className="text-[#37bae3]">Wash and Fold</h3>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-md border-[1px] border-[#37bae3] p-4">
          <div className="relative h-28 w-28 overflow-hidden">
            <Image
              src="/dry.svg"
              alt="Dry Clothing Icon"
              fill
              className="object-contain"
            />
          </div>
          <h3 className="text-[#37bae3]">Dry Cleaning</h3>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-md border-[1px] border-[#37bae3] p-4">
          <div className="relative h-28 w-28 overflow-hidden">
            <Image
              src="/iron.svg"
              alt="Iron Icon"
              fill
              className="object-contain"
            />
          </div>
          <h3 className="text-[#37bae3]">Ironing and Pressing</h3>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-md border-[1px] border-[#37bae3] p-4">
          <div className="relative h-28 w-28 overflow-hidden">
            <Image
              src="/delivery2.svg"
              alt="Delivery Icon"
              fill
              className="object-contain"
            />
          </div>
          <h3 className="text-[#37bae3]">Pick Up and Delivery</h3>
        </div>
      </div>
    </div>
  );
};

export default Services;
