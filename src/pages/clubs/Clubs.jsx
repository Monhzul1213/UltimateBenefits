import React, { useState } from "react";
import { withSize } from "react-sizeme";
import { useAuth } from "../../context/AuthProvider";
import { CustomHeader } from "../../components";
import { clubsItems } from "../../constants";
import { Button } from "antd";
import "../../css/club.css";


const ClubCard = ({ club, onClick }) => (
  <div className="image-container" onClick={onClick}>
    <img src={club.Image} alt={club.altText} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
    <div className="card-title">{club.title}</div>
  </div>
);

const Clubs = () => {
  const handleCardOpen = (idx) => {
    console.log(`Opening card ${idx}`);
  };

  const handleAddClub = () => {
    console.log("Adding new club");
  };

  return (
    <>
      <CustomHeader title="Сонирхлын клубууд" />
      <main className="club-container">
        <div className="cards-container">
          {clubsItems.map((club, index) => (
            <ClubCard key={index} club={club} onClick={() => handleCardOpen(index)} />
          ))}
          <div className="image-container add-club" onClick={handleAddClub}>
            <div className="add-club-button">+</div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Clubs;