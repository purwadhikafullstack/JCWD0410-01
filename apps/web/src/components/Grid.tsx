"use client";
import React, { useState, useRef, useEffect } from "react";
import { LayoutGrid } from "../components/ui/layout-grid";

export function LayoutGridDemo() {
  return (
    <div className="h-[650px] w-full md:h-[500px]">
      <LayoutGrid cards={cards} />
    </div>
  );
}

const SkeletonFour = () => {
  return (
    <div>
      <p className="text-xl font-bold text-white md:text-4xl">
        Pick Up and Delivery
      </p>
      <p className="text-base font-normal text-white"></p>
      <p className="my-4 max-w-lg text-base font-normal text-neutral-200">
        Enjoy the convenience of our pick-up and delivery service, ensuring your
        laundry is taken care of from the comfort of your home. We handle
        everything, from collecting to delivering fresh, clean clothes.
      </p>
    </div>
  );
};

const SkeletonOne = () => {
  return (
    <div>
      <p className="text-xl font-bold text-white md:text-4xl">Washing</p>
      <p className="text-base font-normal text-white"></p>
      <p className="my-4 text-base font-normal text-neutral-200">
        Our washing service uses advanced machines and high-quality detergents
        to give your clothes a deep, refreshing clean, while maintaining fabric
        quality and color vibrancy.
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="text-xl font-bold text-white md:text-4xl">Ironing</p>
      <p className="text-base font-normal text-white"></p>
      <p className="my-4 max-w-lg text-base font-normal text-neutral-200">
        Experience professional ironing that ensures your clothes are
        wrinkle-free and neatly pressed, ready to wear for any occasion.
      </p>
    </div>
  );
};

const SkeletonThree = () => {
  return (
    <div>
      <p className="text-xl font-bold text-white md:text-4xl">Packing</p>
      <p className="text-base font-normal text-white"></p>
      <p className="my-4 max-w-lg text-base font-normal text-neutral-200">
        Our packing service ensures your freshly cleaned clothes are folded and
        packaged with care, keeping them clean, organized, and ready for your
        next adventure.
      </p>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className:
      "md:col-span-3 col-span-1  shadow rounded-md hover:cursor-pointer",
    thumbnail:
      "https://static.toiimg.com/thumb/msid-108846460,width-1280,height-720,resizemode-4/108846460.jpg",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className:
      "md:col-span-2 col-span-1 hover:cursor-pointer shadow rounded-md",
    thumbnail:
      "https://kellysdrycleaners.com/wp-content/uploads/How-to-Iron-Shirts-and-Pants-Correctly.jpg",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className:
      "md:col-span-2 col-span-1 hover:cursor-pointer shadow rounded-md",
    thumbnail:
      "https://images.unsplash.com/photo-1567113463300-102a7eb3cb26?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className:
      "md:col-span-3 col-span-1 hover:cursor-pointer shadow rounded-md",
    thumbnail: "/image.png",
  },
];
