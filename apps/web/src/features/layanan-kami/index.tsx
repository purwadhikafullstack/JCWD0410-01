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
              Services and Pricing
            </h1>
            <p className="text-neutral-500">
              At FreshNest Laundry, we offer a variety of laundry services
              designed to meet your needs with the highest quality. We use
              modern machines and the latest technology to ensure the
              cleanliness, freshness, and quality of your garments. Check out
              our service details and pricing to choose the option that best
              suits your needs.
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
