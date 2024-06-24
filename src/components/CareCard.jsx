import { Button } from "antd";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const CareCard = ({
  icon,
  title,
  description,
  type,
  idx,
  openIdx,
  setOpenIdx,
}) => {
  const buttonText =
    type === "available"
      ? "Боломжтой"
      : type === "used"
      ? "Ашигласан"
      : "Боломжгүй";
  const displayArrow = idx === openIdx ? "hide" : "show";

  const variants = {
    show: {
      height: 650,
      transition: { duration: 0.3, type: "easeInOut" },
    },
    hide: {
      height: 290,
      transition: { duration: 0.3, type: "easeInOut" },
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
        if (openIdx == idx) {
          setOpenIdx(null);
        } else {
          setOpenIdx(idx);
        }
      }}
      variants={variants}
      animate={openIdx === idx ? "show" : "hide"}
      className={`care-card care-card-${type}`}
    >
      <Button
        type="primary"
        className={`care-card-button care-card-button-${type}`}
      >
        {buttonText}
      </Button>
      <div>
        <img src={icon} alt={`${title}'s image`} />
        <h3>{title}</h3>
      </div>
      <motion.p
        variants={textVariants}
        animate={openIdx === idx ? "show" : "hide"}
        className="care-card-description"
      >
        {description}
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
