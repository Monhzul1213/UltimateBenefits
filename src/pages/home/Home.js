import React from "react";
import HeroSection from "../../components/HeroSection";
import Benefits from "../../components/Benefits";

import "../../css/home.css";

export function Home() {
  return (
    <main className="home-container">
      <HeroSection />
      <Benefits />
    </main>
  );
}
