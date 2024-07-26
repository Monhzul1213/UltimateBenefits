import React from "react";
import { Button } from "antd";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const ClubCard = ({
  club,
  idx,
  openIdx,
  hideIdx,
  handleCardOpen,
  isTwo,
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
      onClick={() => handleCardOpen(idx)}
      variants={variants}
      animate={openIdx === idx ? "show" : idx === hideIdx ? "none" : "hide"}
      className={`club-card club-card-${club.Name}`}
    >
      <Button type="primary" className={`club-card-button club-card-button-${club.Name}`}>
        {club.Name}
      </Button>
      <div>
        <img src={club.Image} alt={club.Name} />
        <h3>{club.Name.toUpperCase()}</h3>
      </div>
      <motion.p
        variants={textVariants}
        animate={openIdx === idx ? "show" : "hide"}
        className="club-card-description"
      >
        {club.Descr}
      </motion.p>
      <motion.div
        initial={{ display: "none", opacity: 0 }}
        variants={textVariants}
        animate={openIdx === idx ? "show" : "hide"}
        className="club-card-footer"
      >
        <Button className="club-card-footer-btn">Back</Button>
        <Button className="club-card-footer-btn btn-primary">View Details</Button>
      </motion.div>
      <FaArrowRight size={25} className={`club-card-arrow ${displayArrow}`} />
    </motion.div>
  );
};

export default ClubCard;
