import React, { useState } from "react";
import { withSize } from "react-sizeme";
import { CustomHeader } from "../../components";
import DiscountsCard from "../../components/DiscountsCard";
import { discountsi } from "../../constants";
import "../../css/discounts.css";
import { FaPlusCircle } from "react-icons/fa";
import { bonus1, bonus2, phone, lunch1, lunch2, bday, gym1, gym2 } from "../../assets";

const Discounts = ({ size }) => {
  const [openIdx, setOpenIdx] = useState(null);

  const handleCardOpen = (idx) => {
    setOpenIdx(prevIdx => (prevIdx === idx ? null : idx));
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
        <div className="cards-grid">
          {discountsi.map((discount, discountIndex) => (
            <div
              key={`discount-${discountIndex}`}
              className={`card ${discount.images.length > 1 ? 'highlight' : ''}`}
              onClick={() => handleCardOpen(discountIndex)}
            >
              {discount.images.map((image, imageIndex) => (
                <img
                  key={`discount-${discountIndex}-img-${imageIndex}`}
                  src={image}
                  alt={discount.description || `Image ${imageIndex + 1}`}
                  className={`discount-image ${getClassNameForImage(image, imageIndex)}`}
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
              ))}
              <div className="overlay"></div>
              <div className="discounts-card">{discount.description}</div>
            </div>
          ))}
          <div className="add-card">
          <FaPlusCircle size="4em"  />
          </div>
        </div>
      </main>
    </>
  );
};

function getClassNameForImage(image, imageIndex) {
  const imageClassMap = {
    [phone]: 'phone',
    [gym1]: 'gym',
    [gym2]: 'gym',
    [bonus1]: 'bonus',
    [bonus2]: 'bonus',
    [lunch1]: 'lunch',
    [lunch2]: 'lunch',
    [bday]: 'birthday',
  };

  let className = imageClassMap[image] || '';

  if (imageIndex === 0) {
    className += ' first-image';
  } else if (imageIndex === 1) {
    className += ' second-image';
  }

  return className;
}

export default withSize()(Discounts);
