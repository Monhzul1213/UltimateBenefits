import React, { useState } from "react";
import { withSize } from "react-sizeme";
import { CustomHeader } from "../../components";
import { discountsi } from "../../constants";
import "../../css/discounts.css";
import { FaPlusCircle } from "react-icons/fa";
import { bonus1, bonus2, phone, lunch1, lunch2, bday, gym1, gym2 } from "../../assets";

const Discounts = ({ size }) => {
  const [openIdx, setOpenIdx] = useState(null);

  const handleCardOpen = (idx) => {
    setOpenIdx(prevIdx => (prevIdx === idx ? null : idx));
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
                />
              ))}
              <div className="overlay"></div>
              <div className="discounts-card">{discount.description}</div>
            </div>
          ))}
          <div className="add-card">
            <FaPlusCircle size="3em"  /> {/* Adjust size and color here */}
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
