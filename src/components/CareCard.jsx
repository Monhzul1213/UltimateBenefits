import { Button } from "antd";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const CareCard = ({
  info,
  idx,
  openIdx,
  hideIdx,
  handleCardOpen,
  isTwo,
  cardData,
}) => {
  const displayArrow = idx === openIdx ? "hide" : "show";

  const variants = isTwo
    ? {
        show: {
          width: 930,
          transition: { duration: 0.3, type: "linear" },
        },
        hide: {
          width: 415,
          opacity: 1,
          transition: {
            opacity: { delay: 0.8 },
          },
        },
        none: {
          width: 0,
          opacity: 0,
          padding: 0,
          display: "none",
          transition: {
            width: { duration: 0.3, type: "linear" },
            opacity: { duration: 0.3, type: "linear" },
            padding: { duration: 0.3, type: "linear" },
            display: { delay: 0.4 },
          },
        },
      }
    : {
        show: {
          height: 680,
          transition: { duration: 0.3, type: "easeInOut" },
        },
        hide: {
          height: 290,
          display: "block",
          opacity: 1,
          transition: {
            height: { duration: 0.3, type: "easeInOut" },
            display: { duration: 0.3, delay: 0.8 },
            opacity: { duration: 0.3, delay: 0.8 },
          },
        },
        none: {
          display: "none",
          opacity: 0,
          transition: { opacity: { duration: 0.3 }, display: { delay: 0.3 } },
        },
      };
  const textVariants = {
    show: {
      opacity: 1,
      display: "flex",
      transition: { duration: 0.5, delay: 0.8 },
    },
    hide: {
      opacity: 0,
      display: "none",
      transition: { duration: 0.1 },
    },
  };
  return (
    <motion.div
      id={isTwo && "care-card-two"}
      onClick={() => {
        handleCardOpen(idx);
      }}
      variants={variants}
      animate={openIdx === idx ? "show" : idx === hideIdx ? "none" : "hide"}
      className={`care-card care-card-${cardData.possible}`}
    >
      <Button
        type="primary"
        className={`care-card-button care-card-button-${cardData.possible}`}
      >
        {cardData.possible}
      </Button>
      <div id={isTwo && "care-card-two-flex"}>
        <div>
          <img src={info.icon} alt={`${info.title}`} />
          <h3>{info.title}</h3>
        </div>
        <motion.p
          variants={textVariants}
          animate={openIdx === idx ? "show" : "hide"}
          className="care-card-description"
        >
          {cardData.possibleDescr}
        </motion.p>
      </div>
      <motion.div
        initial={{ display: "none", opacity: 0 }}
        variants={textVariants}
        animate={openIdx === idx ? "show" : "hide"}
        className="care-card-footer"
      >
        <Button className="care-card-footer-btn">Буцах</Button>
        <Button className="care-card-footer-btn btn-primary">
          Багцын мэдээлэл харах
        </Button>
      </motion.div>
      <FaArrowRight size={25} className={`care-card-arrow ${displayArrow}`} />
    </motion.div>
  );
};

export default CareCard;
