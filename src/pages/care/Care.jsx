import { useEffect, useState } from "react";
import { withSize } from "react-sizeme";

import CustomHeader from "../../components/CustomHeader";
import CareCard from "../../components/CareCard";
import { cares } from "../../constants";
import "../../css/care.css";
import { useAuth } from "../../context/AuthProvider";
import { Spin } from "antd";
import { getCares } from "../../lib/actions/cares.action";

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
  const getCareData = async () => {
    const caresData = await getCares(user.UserID);
    setCardData(caresData);
  };
  useEffect(() => {
    getCareData();
  }, []);

  return (
    <>
      <CustomHeader title="Нийгмийн хангамж" />
      <main className="care-container">
        {cardData ? (
          <div className="cards-container">
            <div className="cards" id={isTwo && "cards-two"}>
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
            <div className="cards" id={isTwo && "cards-two"}>
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
            {/* <div className="cards cards-last " id={isTwo && "cards-two"}>
            <CareCard
              isTwo={isTwo}
              hideIdx={hideIdx}
              handleCardOpen={handleCardOpen}
              setOpenIdx={setOpenIdx}
              openIdx={openIdx}
              idx={6}
              info={cares[4]}
            />
            <CareCard
              isTwo={isTwo}
              hideIdx={hideIdx}
              handleCardOpen={handleCardOpen}
              setOpenIdx={setOpenIdx}
              openIdx={openIdx}
              idx={7}
              info={cares[5]}
            />
          </div> */}
          </div>
        ) : (
          <Spin />
        )}
      </main>
    </>
  );
};

export default withSize()(Care);
