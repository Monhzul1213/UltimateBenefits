import { useState } from "react";
import { withSize } from "react-sizeme";
import { CustomHeader } from "../../components";
import DiscountsCard from "../../components/DiscountsCard";
import { discountsi } from "../../constants";
import "../../css/care.css";
import "../../css/discounts.css";
import { bonus1, bonus2, phone, bday, lunch1, lunch2, gym1, gym2 } from "../../assets";

const Discounts = ({ size }) => {
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
      if (isTwo) {
        setHideIdx([1, 4, 7].includes(idx) ? idx - 1 : null);
      } else {
        setHideIdx(isOne ? null : idx + 1);
      }
    }
  };

  return (
    <>
      <CustomHeader title="Хөнгөлөлт урамшуулал" />
      <main className="discounts-container">
        <div className="discountsl-container">
            <div className="discounts-card1">
              <div className="image-container">
                <img className="bonus1-image" src={bonus1} alt="Bonus" />
                <img className="bonus2-image" src={bonus2} alt="Bonus" />
                <DiscountsCard
                  isTwo={isTwo}
                  hideIdx={hideIdx}
                  handleCardOpen={handleCardOpen}
                  openIdx={openIdx}
                  idx={0}
                  info={discountsi[0]}
                />
              </div>
            </div>
          <div className={`cards1 ${isTwo ? "cards-two" : ""}`}>
            <div className="discounts-card-p">
              <img className="phone-image" src={phone} alt="Phone" />
              <DiscountsCard
                isTwo={isTwo}
                hideIdx={hideIdx}
                handleCardOpen={handleCardOpen}
                openIdx={openIdx}
                idx={1}
                info={discountsi[1]} 
              />
            </div>
            <div className="discounts-card-l">
              <img className="bday-image" src={bday} alt="Bday" />
              <DiscountsCard
                isTwo={isTwo}
                hideIdx={hideIdx}
                handleCardOpen={handleCardOpen}
                openIdx={openIdx}
                idx={3}
                info={discountsi[3]}
              />
            </div>
          </div>
          <div className={`cards1 ${isTwo ? "cards-two" : ""}`}>
            <div className="discounts-card-l">
              <div className="image-container">
                <img className="lunch1-image full-image" src={lunch1} alt="Lunch" />
                <img className="lunch2-image" src={lunch2} alt="Lunch" />
                <DiscountsCard
                  isTwo={isTwo}
                  hideIdx={hideIdx}
                  handleCardOpen={handleCardOpen}
                  openIdx={openIdx}
                  idx={2}
                  info={discountsi[2]}
                />
              </div>
            </div>
            <div className="discounts-card-p">
              <div className="image-container">
                <img className="gym1-image full-image" src={gym1} alt="Gym" />
                <img className="gym2-image" src={gym2} alt="Gym" />
                <DiscountsCard
                  isTwo={isTwo}
                  hideIdx={hideIdx}
                  handleCardOpen={handleCardOpen}
                  openIdx={openIdx}
                  idx={4}
                  info={discountsi[4]}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default withSize()(Discounts);
