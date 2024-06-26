import React from "react";
import { Benefits, HeroSection, Footer } from "../../components";

import "../../css/home.css";

export function Home() {
  return (
    <main className="home-container">
      <HeroSection />
      <Benefits />
      <Footer />
    </main>
  );
}
