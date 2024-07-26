import React, { useState } from "react";
import { withSize } from "react-sizeme";
import { CustomHeader, ClubCard } from "../../components";
import "../../css/club.css";

export const Clubs = () => {
   return (
     <>
       <CustomHeader title="Дүрэм журам" />
     </>
   );
 };


const Clubs = ({ size }) => {
  const isOne = size?.width <= 1010;
  const isTwo = size?.width <= 1525 && size?.width > 1010;
  const [openIdx, setOpenIdx] = useState(null);
  const [hideIdx, setHideIdx] = useState(null);

  const handleCardOpen = (idx) => {
    if (openIdx === idx) {
      setOpenIdx(null);
      setHideIdx(null);
    } else {
      setOpenIdx(idx);
      if (isTwo && (idx === 1 || idx === 4 || idx === 7)) {
        setHideIdx(idx - 1);
      } else {
        setHideIdx(isOne ? null : idx + 1);
      }
    }
  };

  return (
    <>
      <CustomHeader title={"Сонирхлын клубууд"} />
      <main className="discounts-container">
        <div className="cards-container">
        <div className="image-container">
              {/* <img className="bonus1-image" src={bonus1} alt="Bonus" />
              <img className="bonus2-image" src={bonus2} alt="Bonus" /> */}
          <div className="discounts-card">
              <ClubCard
                isTwo={isTwo}
                hideIdx={hideIdx}
                handleCardOpen={handleCardOpen}
                setOpenIdx={setOpenIdx}
                openIdx={openIdx}
                idx={0}
                // info={discountsi[0]}
              />
            </div>
          </div>
          <div className={`cards ${isTwo ? "cards-two" : ""}`}>
          {/* <img className="phone-image" src={phone} alt="Phone" /> */}
            <div className="discounts-card">
              <ClubCard
                isTwo={isTwo}
                hideIdx={hideIdx}
                handleCardOpen={handleCardOpen}
                setOpenIdx={setOpenIdx}
                openIdx={openIdx}
                idx={1}
                // info={discountsi[1]}
              />
            </div>
            <div className="image-container">
                {/* <img className="lunch1-image full-image" src={lunch1} alt="Lunch" />
                <img className="lunch2-image" src={lunch2} alt="Lunch" /> */}
            <div className="discounts-card">
                <ClubCard
                  isTwo={isTwo}
                  hideIdx={hideIdx}
                  handleCardOpen={handleCardOpen}
                  setOpenIdx={setOpenIdx}
                  openIdx={openIdx}
                  idx={2}
                  // info={discountsi[2]}
                />
              </div>
            </div>
          </div>
          <div className={`cards ${isTwo ? "cards-two" : ""}`}>
          {/* <img className="bday-image" src={bday} alt="Bday" /> */}
            <div className="discounts-card">
              <ClubCard
                isTwo={isTwo}
                hideIdx={hideIdx}
                handleCardOpen={handleCardOpen}
                setOpenIdx={setOpenIdx}
                openIdx={openIdx}
                idx={3}
                // info={discountsi[3]}
              />
            </div>
            <div className="image-container">
                {/* <img className="gym1-image full-image" src={gym1} alt="Gym" />
                <img className="gym2-image" src={gym2} alt="Gym" /> */}
            <div className="discounts-card">
                <ClubCard
                  isTwo={isTwo}
                  hideIdx={hideIdx}
                  handleCardOpen={handleCardOpen}
                  setOpenIdx={setOpenIdx}
                  openIdx={openIdx}
                  idx={4}
                  // info={discountsi[4]}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default withSize()(Clubs);
