import React, { useState } from "react";
import { withSize } from "react-sizeme";
import { CustomHeader } from "../../components";
import { discountsi } from "../../constants";
import "../../css/discounts.css";
import DiscountsCard from "../../components/DiscountsCard";
import {
  bonus1,
  bonus2,
  phone,
  phone1,
  lunch1,
  lunch2,
  bday,
  gym1,
  gym2,
  add_card,
} from "../../assets";

const Discounts = ({ size }) => {
  const [openIdx, setOpenIdx] = useState(null);
  const [modalData, setModalData] = useState(null);

  const handleCardOpen = (idx) => {
    const discount = discountsi[idx];
    setModalData(discount);
    setOpenIdx((prevIdx) => (prevIdx === idx ? null : idx));
  };

  const handleCloseModal = () => {
    setOpenIdx(null);
    setModalData(null);
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
      </main>
    </>
  );
};

function getClassNameForImage(image, imageIndex) {
  const imageClassMap = {
    [phone]: "phone medium1",
    [phone1]: "phone",
    [gym1]: "gym",
    [gym2]: "gym small",
    [bonus1]: "bonus",
    [bonus2]: "bonus medium1",
    [lunch1]: "lunch",
    [lunch2]: "lunch medium",
    [bday]: "birthday",
    [add_card]: "add_card"
  };

  let className = imageClassMap[image] || "";

  if (imageIndex === 0) {
    className += " first-image";
  } else if (imageIndex === 1) {
    className += " second-image";
  }

  return className;
}

export default withSize()(Discounts);
