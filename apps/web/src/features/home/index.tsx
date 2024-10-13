"use client";

import Branch from "./components/Branch";
import Jumbotron from "./components/Jumbotron";
import Promo from "./components/Promo";
import HowItWorks from "./components/Reason";
import Review from "./components/Review";

const HomePage = () => {
  return (
    <div>
      <Jumbotron />
      <HowItWorks />
      <Promo />
      <Branch />
      <Review />
    </div>
  );
};

export default HomePage;
