import React, { useState } from "react";
import { withSize } from "react-sizeme";
import { CustomHeader } from "../../components";
import { discountsi } from "../../constants";
import "../../css/discounts.css";
import DiscountsCard from "../../components/DiscountsCard";
import DiscountsAdd from "../../components/DiscountsAdd";
import DiscountsOption from "../../components/DiscountsOption";
import { bonus, phone, lunch, bday, gym, add_card } from "../../assets";

const Discounts = ({ size }) => {
  const [openIdx, setOpenIdx] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false); 

  const handleCardOpen = (idx) => {
    const discount = discountsi[idx];
    if (discount.images.includes(add_card)) {
      setIsAdding(true);
    } else if (discount.images.includes(bday)) {
      setIsOptionsVisible(true);
    } else {
      setModalData(discount);
      setOpenIdx((prevIdx) => (prevIdx === idx ? null : idx));
    }
  };

  const handleCloseModal = () => {
    setOpenIdx(null);
    setModalData(null);
    setIsAdding(false);
    setIsOptionsVisible(false); 
  };

  return (
    <>
      <CustomHeader title="Хөнгөлөлт урамшуулал" />
      <main className="discounts-container">
        <div className="cards-grid">
          {discountsi.map((discount, discountIndex) => (
            <div
              key={`discount-${discountIndex}`}
              className={`card ${discount.images.length > 1 ? "highlight" : ""}`}
              onClick={() => handleCardOpen(discountIndex)}
            >
              {discount.images.map((image, imageIndex) => (
                <img
                  key={`discount-${discountIndex}-img-${imageIndex}`}
                  src={image}
                  alt={discount.title || `Image ${imageIndex + 1}`}
                  className={`discount-image ${getClassNameForImage(image, imageIndex)}`}
                />
              ))}
              <div className="overlay"></div>
              <div className="discounts-card">{discount.title}</div>
            </div>
          ))}
        </div>
        {modalData && (
          <DiscountsCard
            visible={openIdx !== null}
            onClose={handleCloseModal}
            data={modalData}
          />
        )}
        {isAdding && (
          <DiscountsAdd
            visible={isAdding}
            onClose={handleCloseModal}
            data={isAdding}
          />
        )}
        {isOptionsVisible && (
          <DiscountsOption
            visible={isOptionsVisible}
            onClose={handleCloseModal}
          />
        )}
      </main>
    </>
  );
};

function getClassNameForImage(image, imageIndex) {
  const imageClassMap = {
    [phone]: "phone",
    [gym]: "gym",
    [bonus]: "bonus",
    [lunch]: "lunch",
    [bday]: "birthday",
    [add_card]: "add_card"
  };

  return imageClassMap[image] || ""; 
}

export default withSize()(Discounts);
