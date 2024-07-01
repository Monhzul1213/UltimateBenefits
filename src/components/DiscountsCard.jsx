import { motion } from "framer-motion";

const DiscountsCard = ({ info, idx, openIdx, hideIdx, handleCardOpen, isTwo}) => {

  const variants = isTwo
    ? {
        show: {
          width: 100,
          transition: { duration: 0.3, type: "linear" },
        },
        hide: {
          width: 150,
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
          height: 650,
          transition: { duration: 0.3, type: "easeInOut" },
        },
        hide: {
          height: 250,
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
      id={isTwo && "discounts-card-two"}
      onClick={() => {
        handleCardOpen(idx);
      }}
      variants={variants}
      animate={openIdx === idx ? "show" : idx === hideIdx ? "none" : "hide"}
      className={`care-card care-card-${info.type}`}
    >
      <div id={isTwo && "discounts-card-two-flex"}>
      <div> 
          <h3>{info.title}</h3>
        </div>
        <motion.p
          variants={textVariants}
          animate={openIdx === idx ? "show" : "hide"}
        >
          {info.description}
        </motion.p>
      </div>
      <motion.div
        initial={{ display: "none", opacity: 0 }}
        variants={textVariants}
        animate={openIdx === idx ? "show" : "hide"}
      >
      </motion.div>
    </motion.div>
  );
};

export default DiscountsCard;
