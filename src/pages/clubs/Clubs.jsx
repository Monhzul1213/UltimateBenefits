import React, { useState } from "react";
import { CustomHeader } from "../../components";
import { clubsItems } from "../../constants";
import "../../css/club.css";
import {ClubsModal} from "../../components"; 

const ClubCard = ({ club, onClick }) => (
  <div className="image-container club-image-container" onClick={onClick}>
    <img src={club.Image} alt={club.altText} />
    <div className="card-title">{club.title}</div>
  </div>
);

const Clubs = () => {
  const [selectedClub, setSelectedClub] = useState(null);

  const handleCardOpen = (club) => {
    setSelectedClub(club);
  };

  const handleCloseModal = () => {
    setSelectedClub(null);
  };

  return (
    <>
      <CustomHeader title="Сонирхлын клубууд" />
      <main className="club-container">
        <div className="cards-container">
          {clubsItems.map((club, index) => (
            <ClubCard key={index} club={club} onClick={() => handleCardOpen(club)} />
          ))}
        </div>
      </main>
      <ClubsModal isOpen={!!selectedClub} onClose={handleCloseModal} club={selectedClub} />
    </>
  );
};

export default Clubs;