import { useEffect, useState } from "react";
import { withSize } from "react-sizeme";
import { useAuth } from "../../context/AuthProvider";
import { Button, Spin } from "antd";

import { CustomHeader, CareCard, Loader } from "../../components";

import "../../css/care.css";
import { useCare } from "../../context/CareProvider";
import { IoReload } from "react-icons/io5";
import { checkRole } from "../../lib/utils/checkRole";
import { nemeh } from "../../assets";
import CareCategoryModal from "../../components/CareCategoryModal";

const Care = ({ size }) => {
  const isOne = size?.width <= 1010;
  const isTwo = size?.width <= 1525 && size?.width >= 1010;

  const { user } = useAuth();
  const { getCares, careFailed, careLoading, careCategory } = useCare();

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

  //ADD EDIT DELETE
  const [addOpen, setAddOpen] = useState(false);
  const handleAddModal = (value) => {
    setAddOpen(value);
  };

  return (
    <>
      <CustomHeader title="Нийгмийн хангамж" />
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
                {data.map((card, idx) => (
                  <CareCard
                    key={idx}
                    cardData={card}
                    isTwo={isTwo}
                    hideIdx={hideIdx}
                    handleCardOpen={handleCardOpen}
                    setOpenIdx={setOpenIdx}
                    openIdx={openIdx}
                    idx={card.ID}
                  />
                ))}
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
      <CareCategoryModal open={addOpen} handleAddModal={handleAddModal} />
    </>
  );
};

export default withSize()(Care);
