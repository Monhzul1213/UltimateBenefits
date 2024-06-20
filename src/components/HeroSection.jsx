import React from "react";
import { garchigIcon, heroLogo } from "../assets";
import Header from "./Header";

const HeroSection = () => {
  return (
    <section className="hero-container">
      <Header />
      <div className="hero-content">
        <div className="hero-title">
          <img src={heroLogo} alt="garchig" />
          <p className="hero-desc">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea omnis
            asperiores illo qui est tempora, ipsam molestias quam impedit
            temporibus ducimus, nesciunt neque laboriosam voluptatum. Aliquam
            exercitationem aperiam laboriosam molestias.
          </p>
        </div>
        <div className="hero-image">
          <img src={garchigIcon} alt="benefits" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
