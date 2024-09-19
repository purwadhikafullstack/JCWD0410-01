import Branch from "./components/Branch";
import HowItWorks from "./components/Reason";
import Jumbotron from "./components/Jumbotron";
import Promo from "./components/Promo";

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
