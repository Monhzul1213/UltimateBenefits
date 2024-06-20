import React from "react";
import HeroSection from "../../components/HeroSection";
import Benefits from "../../components/Benefits";

import "../../css/home.css";
import Footer from "../../components/Footer";

export function Home() {
  return (
    <main className="home-container">
      <HeroSection />
      <Benefits />
      <Footer />
    </main>
  );
}
