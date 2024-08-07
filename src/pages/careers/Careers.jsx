import { useEffect, useState } from "react";
import { withSize } from "react-sizeme";
import { useAuth } from "../../context/AuthProvider";
import { Button, Spin } from "antd";

import { CustomHeader, CareCard, Loader } from "../../components";

import "../../css/care.css";
import { IoReload } from "react-icons/io5";
import { checkRole } from "../../lib/utils/checkRole";
import { nemeh } from "../../assets";
import { useCareer } from "../../context/CareerProvider";
import CareerCard from "../../components/career/CareerCard";
import CareerDetailModal from "../../components/career/CareerDetailModal";
import CareerCategoryModal from "../../components/career/CareCategoryModal";
import CareerDetailWatch from "../../components/career/CareerDetailWatchModal";

const CareerPage = ({ size }) => {
  let counter = 1;

  const isOne = size?.width <= 1010;
  const isTwo = size?.width <= 1525 && size?.width >= 1010;

  const { user } = useAuth();
  const { getCares, careFailed, careLoading, careCategory } = useCareer();

  const [openIdx, setOpenIdx] = useState(null);
  const [hideIdx, setHideIdx] = useState(null);
  const handleCardOpen = (idx) => {
    if (openIdx === idx) {
      setOpenIdx(null);
      setHideIdx(null);
    } else {
      setOpenIdx(idx);
      if (idx % 2 === 0) {
        isTwo && setHideIdx(idx - 1);
        isOne && setHideIdx(null);
      } else {
        setHideIdx(idx + 1);
      }
    }
  };

  useEffect(() => {
    getCares(user.UserID);
  }, [user.UserID]);

  //ADD EDIT DELETE CATEGORY
  const [addOpen, setAddOpen] = useState(false);
  const handleAddModal = (value) => {
    setAddOpen(value);
  };
  //ADD EDIT DETAIL
  const [detailOpen, setDetailOpen] = useState(false);
  const handleDetailModal = (value) => {
    setDetailOpen(value);
  };
  //WATCH DETAIL
  const [watchModal, setWatchModal] = useState(false);
  const [watchTitle, setWatchTitle] = useState("");
  return (
    <>
      <CustomHeader title="Карьер хөгжил" />
      <main className="care-container">
        {careLoading ? (
          <Loader />
        ) : careFailed ? (
          <div className="employee-error">
            <p>Алдаа гарлаа</p>
            <Button
              onClick={() => {
                getCares(user.UserID);
              }}
              icon={<IoReload />}
            >
              Дахин оролдох
            </Button>
          </div>
        ) : (
          <div className="care-cards-container">
            {careCategory?.map((data, index) => (
              <div key={index} className="care-cards" id={isTwo && "cards-two"}>
                {data.map((card, idx) => {
                  const currentIdx = counter;
                  counter++;
                  return (
                    <CareerCard
                      setWatchTitle={setWatchTitle}
                      setWatchModal={setWatchModal}
                      handleDetailModal={handleDetailModal}
                      handleAddModal={handleAddModal}
                      key={idx}
                      cardData={card}
                      isTwo={isTwo}
                      hideIdx={hideIdx}
                      handleCardOpen={handleCardOpen}
                      setOpenIdx={setOpenIdx}
                      openIdx={openIdx}
                      idx={currentIdx}
                    />
                  );
                })}
              </div>
            ))}
            {checkRole(user?.Role) && (
              <img
                onClick={() => {
                  handleAddModal(true);
                }}
                className="care-category-add"
                src={nemeh}
                alt=""
              />
            )}
          </div>
        )}
      </main>
      <CareerCategoryModal open={addOpen} handleAddModal={handleAddModal} />
      <CareerDetailModal
        open={detailOpen}
        handleDetailModal={handleDetailModal}
      />
      <CareerDetailWatch
        handleDetailModal={handleDetailModal}
        watchTitle={watchTitle}
        watchModal={watchModal}
        setWatchModal={setWatchModal}
      />
    </>
  );
};

export default withSize()(CareerPage);
