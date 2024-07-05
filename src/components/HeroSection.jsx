import { garchigIcon, heroLogo } from "../assets";
import { Header } from "../components";

export const HeroSection = () => {
  return (
    <section className="hero-container">
      <Header />
      <div className="hero-content">
        <div className="hero-title">
          <img src={heroLogo} alt="garchig" />
          <p className="hero-desc">
            Эрхэм Ultimate family-ийн гишүүн танд идэвх санаачлагатай,
            сэтгэлтэй, өндөр бүтээмжтэй ажиллаж байгаад тань талархал
            илэрхийлье. Ultimate Benefits веб хуудсаас та ажилтны гарын авлага,
            дүрэм журмууд, сургалт, карьер хөгжлийн боломжууд, хөнгөлөлт,
            хангамж, урамшуулал, сонирхлын клубуудын талаар мэдээлэл авах
            боломжтой.
          </p>
        </div>
        <div className="hero-image">
          <img src={garchigIcon} alt="benefits" />
        </div>
      </div>
    </section>
  );
};
