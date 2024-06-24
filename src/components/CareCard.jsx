import { Button } from "antd";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const CareCard = ({
  info,
  idx,
  openIdx,
  setOpenIdx,
  hideIdx,
  handleCardOpen,
}) => {
  const buttonText =
    info.type === "available"
      ? "Боломжтой"
      : info.type === "used"
      ? "Ашигласан"
      : "Боломжгүй";
  const displayArrow = idx === openIdx ? "hide" : "show";

  const variants = {
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
      transition: { duration: 0 },
    },
  };
  const textVariants = {
    show: {
      opacity: 1,
      display: "flex",
      transition: { duration: 0.5, delay: 0.6 },
    },
    hide: {
      opacity: 0,
      display: "none",
      transition: { duration: 0.1 },
    },
  };
  return (
    <motion.div
      onClick={() => {
        handleCardOpen(idx);
      }}
      variants={variants}
      animate={openIdx === idx ? "show" : idx === hideIdx ? "none" : "hide"}
      className={`care-card care-card-${info.type}`}
    >
      <Button
        type="primary"
        className={`care-card-button care-card-button-${info.type}`}
      >
        {buttonText}
      </Button>
      <div>
        <img src={info.icon} alt={`${info.title}'s image`} />
        <h3>{info.title}</h3>
      </div>
      <motion.p
        variants={textVariants}
        animate={openIdx === idx ? "show" : "hide"}
        className="care-card-description"
      >
        {info.description}
      </motion.p>
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
