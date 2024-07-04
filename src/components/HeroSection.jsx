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
            илэрхийлье. Ultimate Benefits веб хуудсаас та ажилд орсон эхний
            өдрөөс тань эхлэн таныг чиглүүлэх, туслах гарын авлага, дүрэм
            журмууд, сургалт, карьер хөгжлийн боломжууд, компанийн зүгээс танд
            олгож буй хөнгөлөлт, хангамж, урамшуулал, хамтрагч байгууллагуудын
            бүтээгдэхүүн, үйлчилгээг ашиглах эрх, чөлөөт цагаа хамт олонтойгоо
            хөгжилтэй өнгөрөөх сонирхлын клубуудын талаар мэдээлэл авах
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
