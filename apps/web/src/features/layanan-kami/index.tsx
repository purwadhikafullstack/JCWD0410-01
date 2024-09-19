import React from "react";
import Price from "./Components/Price";
import Services from "./Components/Services";

const LayananPage = () => {
  return (
    <div>
      <div className="bg-[#e5f3f6]">
        <div className="mx-auto max-w-7xl space-y-10 px-6 py-10 md:py-20">
          <div className="grid grid-cols-1 items-center justify-between md:grid-cols-2">
            <h1 className="pb-2 text-3xl font-semibold text-[#37bae3] md:text-4xl">
              Layanan dan Harga
            </h1>
            <p className="text-neutral-500">
              Di FreshNest Laundry, kami menawarkan berbagai layanan laundry
              yang dirancang untuk memenuhi kebutuhan Anda dengan kualitas
              terbaik. Kami menggunakan mesin modern dan teknologi terbaru untuk
              menjaga kebersihan, kesegaran, dan kualitas pakaian Anda. Lihat
              rincian layanan dan harga kami untuk memilih opsi yang sesuai
              dengan kebutuhan Anda.
            </p>
          </div>
        </div>
      </div>
      <Services />
      <Price />
    </div>
  );
};

export default LayananPage;
