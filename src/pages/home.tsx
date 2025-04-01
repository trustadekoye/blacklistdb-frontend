import React from "react";
import HeroSection from "../components/HeroSection";
import HowItWorksSection from "../components/howitworks";
import NewsUpdatesSection from "../components/NewsandUpdates";
import FAQSection from "../components/FAQ";

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <HowItWorksSection />
      <NewsUpdatesSection />
      <FAQSection />
    </div>
  );
};

export default HomePage;
