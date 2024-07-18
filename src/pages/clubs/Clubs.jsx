import React, { useState } from "react";
import { withSize } from "react-sizeme";
import { CustomHeader } from "../../components";
import { clubsItems } from "../../constants";
import "../../css/club.css";

const Clubs = ({ size }) => {
  const [openIdx, setOpenIdx] = useState(null);

  const handleCardOpen = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <>
      <CustomHeader title="Сонирхлын клубууд" />
      <main className="club-container">
        <div className="cards-container">
          <div className="image-container-1st">
            <div className="image-container movie" onClick={() => handleCardOpen(0)}>
              <img src={clubsItems[0].Image} alt={clubsItems[0].altText} className={clubsItems[0].className} />
              <div className="club-card">{clubsItems[0].title}</div>
            </div>
          </div>
          <div className="ClubscardGroupped" >
          
          <div className="image-container-2nd">
            <div className="image-container english" onClick={() => handleCardOpen(1)}>
              <img src={clubsItems[1].Image} alt={clubsItems[1].altText} className={clubsItems[1].className} />
              <div className="club-card">{clubsItems[1].title}</div>
            </div>
            <div className="image-container adventure" onClick={() => handleCardOpen(2)}>
              <img src={clubsItems[2].Image} alt={clubsItems[2].altText} className={clubsItems[2].className} />
              <div className="club-card">{clubsItems[2].title}</div>
            </div>
          </div>
          
          <div className="image-container-3rd">
            <div className="image-container sports" onClick={() => handleCardOpen(3)}>
              <img src={clubsItems[3].Image} alt={clubsItems[3].altText} className={clubsItems[3].className} />
              <div className="club-card">{clubsItems[3].title}</div>
            </div>
            <div className="image-container dota" onClick={() => handleCardOpen(4)}>
              <img src={clubsItems[4].Image} alt={clubsItems[4].altText} className={clubsItems[4].className} />
              <div className="club-card">{clubsItems[4].title}</div>
            </div>
          </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default withSize()(Clubs);