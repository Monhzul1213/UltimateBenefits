import { heart } from "../assets";
import { benefits } from "../constants";
import { FaArrowRight } from "react-icons/fa";

const Benefits = () => {
  return (
    <section className="benefits-container">
      <div className="benefits-title">
        <h2>OUR BENEFITS FOR YOU</h2>
        <img src={heart} alt="heart" />
      </div>
      <section className="benefits">
        {benefits.map((fit) => (
          <a key={fit.title} className="benefit" href={fit.route}>
            <img src={fit.icon} alt={fit.alt} />
            <h3>{fit.title}</h3>
            <FaArrowRight size={25} className="arrow" />
          </a>
        ))}
      </section>
    </section>
  );
};

export default Benefits;
