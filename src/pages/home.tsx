import React from "react";
import Navbar from "../components/global/NavBar";
import HeroSection from "../components/HeroSection";
import HowItWorksSection from "../components/howitworks";
import NewsUpdatesSection from "../components/NewsandUpdates";
import FAQSection from "../components/FAQ";
import Footer from "../components/global/Footer";

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
