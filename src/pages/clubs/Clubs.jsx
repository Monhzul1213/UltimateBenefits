import React, { useState } from "react";
import { withSize } from "react-sizeme";
import { CustomHeader } from "../../components";
import "../../css/club.css";
import { useAuth } from "../../context/AuthProvider";
import { movie, hands, dotka, volleyball, people } from "../../assets";

const clubs = [
  { name: "MOVIE CLUB", image: movie, className: "movie-image" },
  { name: "ENGLISH LANGUAGE CLUB", image: hands, className: "english-image" },
  { name: "ADVENTURE CLUB", image: people, className: "adventure-image" },
  { name: "SPORTS CLUB", image: volleyball, className: "sports-image" },
  { name: "DOTA CLUB", image: dotka, className: "dota-image" },
];

export const Clubs = ({ size }) => {
  const { user } = useAuth();
  const isOne = size?.width <= 1010;
  const isTwo = size?.width <= 1525 && size?.width > 1010;
  const [openIdx, setOpenIdx] = useState(null);

  const handleCardOpen = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <>
      <CustomHeader title="Сонирхлын клубууд" />
      <main className="club-container">
        <div className="cards-container">
          {clubs.map((club, index) => (
            <div 
              key={index} 
              className={`image-container ${isTwo ? 'two-columns' : ''}`} 
              onClick={() => handleCardOpen(index)}
            >
              <img 
                className={club.className} 
                src={club.image} 
                alt={club.name} 
              />
              <div className={`${club.className.split('-')[0]}-title`}>
                {club.name}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default withSize()(Clubs);