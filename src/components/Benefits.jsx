import { Link } from "react-router-dom";
import { clubs, heart } from "../assets";
import { benefits } from "../constants";
import { FaArrowRight } from "react-icons/fa";
import { checkRole } from "../lib/utils/checkRole";
import { useAuth } from "../context/AuthProvider";

export const Benefits = () => {
  const { user } = useAuth();
  return (
    <section className="benefits-container-container">
      <section className="benefits-container">
        <div className="benefits-title">
          <h2>OUR BENEFITS FOR YOU</h2>
          <img src={heart} alt="heart" />
        </div>
        <section className="benefits">
          {benefits.map((fit) => (
            <Link to={fit.route} key={fit.title} className="benefit">
              <img src={fit.icon} alt={fit.alt} />
              <h3>{fit.title}</h3>
              <FaArrowRight size={25} className="arrow" />
            </Link>
          ))}
          {checkRole(user.Role) && (
            <Link to="/employees" className="benefit">
              <img src={clubs} alt="employe icon" />
              <h3>Ажилтнууд</h3>
              <FaArrowRight size={25} className="arrow" />
            </Link>
          )}
        </section>
      </section>
    </section>
  );
};
