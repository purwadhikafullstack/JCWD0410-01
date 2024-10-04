"use client";

import Branch from "./components/Branch";
import Jumbotron from "./components/Jumbotron";
import Promo from "./components/Promo";
import HowItWorks from "./components/Reason";

const HomePage = () => {
  return (
    <div>
      <Jumbotron />
      <HowItWorks />
      <Promo />
      <Branch />
    </div>
  );
};

export default HomePage;
