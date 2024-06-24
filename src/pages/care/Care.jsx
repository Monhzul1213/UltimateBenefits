import React, { useEffect, useState } from "react";
import { withSize } from "react-sizeme";

import CustomHeader from "../../components/CustomHeader";
import CareCard from "../../components/CareCard";
import { cares } from "../../constants";
import "../../css/care.css";

const Care = ({ size }) => {
  const isOne = size?.width <= 1010;
  const isTwo = size?.width <= 1525 && size?.width >= 1010;

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
  return (
    <>
      <CustomHeader title="Нийгмийн хангамж" />
      <main className="care-container">
        <div className="cards-container">
          <div className="cards" id={isTwo && "cards-two"}>
            <CareCard
              isTwo={isTwo}
              hideIdx={hideIdx}
              handleCardOpen={handleCardOpen}
              setOpenIdx={setOpenIdx}
              openIdx={openIdx}
              idx={0}
              info={cares[0]}
            />
            <CareCard
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
              isTwo={isTwo}
              hideIdx={hideIdx}
              handleCardOpen={handleCardOpen}
              setOpenIdx={setOpenIdx}
              openIdx={openIdx}
              idx={3}
              info={cares[2]}
            />
            <CareCard
              isTwo={isTwo}
              hideIdx={hideIdx}
              handleCardOpen={handleCardOpen}
              setOpenIdx={setOpenIdx}
              openIdx={openIdx}
              idx={4}
              info={cares[3]}
            />
          </div>
          <div className="cards cards-last " id={isTwo && "cards-two"}>
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
          </div>
        </div>
      </main>
    </>
  );
};

export default withSize()(Care);
