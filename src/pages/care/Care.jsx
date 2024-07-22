import { useEffect, useState } from "react";
import { withSize } from "react-sizeme";
import { cares } from "../../constants";
import { useAuth } from "../../context/AuthProvider";
import { Spin } from "antd";
import { getCares } from "../../lib/actions/cares.action";

import { CustomHeader, CareCard } from "../../components";

import "../../css/care.css";

const Care = ({ size }) => {
  const isOne = size?.width <= 1010;
  const isTwo = size?.width <= 1525 && size?.width >= 1010;

  const { user } = useAuth();

  const [openIdx, setOpenIdx] = useState(null);
  const [hideIdx, setHideIdx] = useState(null);
  const handleCardOpen = (idx) => {
    if (openIdx === idx) {
      setOpenIdx(null);
      setHideIdx(null);
    } else {
      setOpenIdx(idx);
      if (
        (isTwo & (idx === 1)) |
        (isTwo & (idx === 4)) |
        (isTwo & (idx === 7))
      ) {
        setHideIdx(idx - 1);
      } else {
        setHideIdx(isOne ? null : idx + 1);
      }
    }
  };

  const [cardData, setCardData] = useState();

  useEffect(() => {
    const getCareData = async () => {
      const caresData = await getCares(user.UserID);
      setCardData(caresData);
    };
    getCareData();
  }, [user.UserID]);

  return (
    <>
      <CustomHeader title="Нийгмийн хангамж" />
      <main className="care-container">
        {cardData ? (
          <div className="care-cards-container">
            <div className="care-cards" id={isTwo && "cards-two"}>
              <CareCard
                cardData={cardData?.healthInsurance}
                isTwo={isTwo}
                hideIdx={hideIdx}
                handleCardOpen={handleCardOpen}
                setOpenIdx={setOpenIdx}
                openIdx={openIdx}
                idx={0}
                info={cares[0]}
              />
              <CareCard
                cardData={cardData?.preventiveExamination}
                isTwo={isTwo}
                hideIdx={hideIdx}
                handleCardOpen={handleCardOpen}
                setOpenIdx={setOpenIdx}
                openIdx={openIdx}
                idx={1}
                info={cares[1]}
              />
            </div>
            <div className="care-cards" id={isTwo && "cards-two"}>
              <CareCard
                cardData={cardData?.vaccine}
                isTwo={isTwo}
                hideIdx={hideIdx}
                handleCardOpen={handleCardOpen}
                setOpenIdx={setOpenIdx}
                openIdx={openIdx}
                idx={3}
                info={cares[2]}
              />
              <CareCard
                cardData={cardData?.apartment}
                isTwo={isTwo}
                hideIdx={hideIdx}
                handleCardOpen={handleCardOpen}
                setOpenIdx={setOpenIdx}
                openIdx={openIdx}
                idx={4}
                info={cares[3]}
              />
            </div>
            <div className="care-cards cards-last " id={isTwo && "cards-two"}>
              <CareCard
                cardData={cardData?.companyCar}
                isTwo={isTwo}
                hideIdx={hideIdx}
                handleCardOpen={handleCardOpen}
                setOpenIdx={setOpenIdx}
                openIdx={openIdx}
                idx={6}
                info={cares[4]}
              />
              <CareCard
                cardData={cardData?.companyProductLogo}
                isTwo={isTwo}
                hideIdx={hideIdx}
                handleCardOpen={handleCardOpen}
                setOpenIdx={setOpenIdx}
                openIdx={openIdx}
                idx={7}
                info={cares[5]}
              />
            </div>
          </div>
        ) : (
          <Spin />
        )}
      </main>
    </>
  );
};

export default withSize()(Care);
