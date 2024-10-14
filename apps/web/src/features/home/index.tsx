"use client";

import HeroSection from "./components/HeroSection";
import Outlet from "./components/Outlet";
import Promo from "./components/Promo";
import Review from "./components/Review";
import Services from "./components/Services";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <Services />
      <Outlet />
      <Promo />

      <Review />
    </div>
  );
};

export default HomePage;
