import { Button, Dropdown } from "antd";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { useCare } from "../context/CareProvider";
import Swal from "sweetalert2";
import { checkRole } from "../lib/utils/checkRole";
import { useAuth } from "../context/AuthProvider";

export const CareCard = ({
  info,
  idx,
  openIdx,
  hideIdx,
  handleCardOpen,
  isTwo,
  cardData,
  handleAddModal,
  handleDetailModal,
  setWatchTitle,
  setWatchModal,
}) => {
  const { user } = useAuth();
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
            display: { delay: 0.3 },
          },
        },
      }
    : {
        show: {
          height: 680,
          transition: { delay: 0.3, duration: 0.3, type: "easeInOut" },
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

  const {
    setCategoryEdit,
    setCategoryForm,
    deleteCareCategory,
    setEditImg,
    setSelectedCategory,
    getCareDetail,
  } = useCare();
  const handleEdit = () => {
    setCategoryEdit(true);
    setCategoryForm(cardData);
    handleAddModal(true);
    setEditImg(cardData.Image);
    setCategoryForm((prev) => ({ ...prev, Image: null }));
  };
  const handleDelete = () => {
    Swal.fire({
      title: "Устгахдаа итгэлтэй байна уу?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Болих",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Устгах",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCareCategory(cardData.ID);
      }
    });
  };
  const handleAddDetail = () => {
    handleDetailModal(true);
    setSelectedCategory(cardData.ID);
  };
  const items = [
    {
      label: "Дэлгэрэнгүй нэмэх",
      key: "1",
      onClick: handleAddDetail,
    },
    {
      label: "Засах",
      key: "2",
      onClick: handleEdit,
    },
    {
      label: "Устгах",
      key: "3",
      danger: true,
      onClick: handleDelete,
    },
  ];

  return (
    <>
      {checkRole(user.Role) ? (
        <Dropdown menu={{ items }} trigger={["contextMenu"]}>
          <motion.div
            id={isTwo && "care-card-two"}
            onClick={() => {
              handleCardOpen(idx);
            }}
            variants={variants}
            animate={
              openIdx === idx ? "show" : idx === hideIdx ? "none" : "hide"
            }
            className={`care-card care-card-${cardData?.AvailableDesc}`}
          >
            <Button
              type="primary"
              className={`care-card-button care-card-button-${cardData?.AvailableDesc}`}
            >
              {cardData?.AvailableDesc}
            </Button>
            <div id={isTwo && "care-card-two-flex"}>
              <div>
                <img src={"data:image/jpeg;base64," + cardData.Image} />
                <h3>{cardData?.Name.toUpperCase()}</h3>
              </div>
              <motion.p
                variants={textVariants}
                animate={openIdx === idx ? "show" : "hide"}
                className="care-card-description"
              >
                {cardData?.Descr}
              </motion.p>
            </div>
            <motion.div
              initial={{ display: "none", opacity: 0 }}
              variants={textVariants}
              animate={openIdx === idx ? "show" : "hide"}
              className="care-card-footer"
            >
              <Button className="care-card-footer-btn">Буцах</Button>
              <Button
                onClick={() => {
                  getCareDetail(cardData.ID);
                  setWatchTitle(cardData?.Name.toUpperCase());
                  setWatchModal(true);
                }}
                className="care-card-footer-btn btn-primary"
              >
                Багцын мэдээлэл харах
              </Button>
            </motion.div>
            <FaArrowRight
              size={25}
              className={`care-card-arrow ${displayArrow}`}
            />
          </motion.div>
        </Dropdown>
      ) : (
        <motion.div
          id={isTwo && "care-card-two"}
          onClick={() => {
            handleCardOpen(idx);
          }}
          variants={variants}
          animate={openIdx === idx ? "show" : idx === hideIdx ? "none" : "hide"}
          className={`care-card care-card-${cardData?.AvailableDesc}`}
        >
          <Button
            type="primary"
            className={`care-card-button care-card-button-${cardData?.AvailableDesc}`}
          >
            {cardData?.AvailableDesc}
          </Button>
          <div id={isTwo && "care-card-two-flex"}>
            <div>
              <img src={"data:image/jpeg;base64," + cardData.Image} />
              <h3>{cardData?.Name.toUpperCase()}</h3>
            </div>
            <motion.p
              variants={textVariants}
              animate={openIdx === idx ? "show" : "hide"}
              className="care-card-description"
            >
              {cardData?.Descr}
            </motion.p>
          </div>
          <motion.div
            initial={{ display: "none", opacity: 0 }}
            variants={textVariants}
            animate={openIdx === idx ? "show" : "hide"}
            className="care-card-footer"
          >
            <Button className="care-card-footer-btn">Буцах</Button>
            <Button
              onClick={() => {
                getCareDetail(cardData.ID);
              }}
              className="care-card-footer-btn btn-primary"
            >
              Багцын мэдээлэл харах
            </Button>
          </motion.div>
          <FaArrowRight
            size={25}
            className={`care-card-arrow ${displayArrow}`}
          />
        </motion.div>
      )}
    </>
  );
};
