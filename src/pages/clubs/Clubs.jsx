import React, { useState } from "react";
import { CustomHeader } from "../../components";
import { clubsItems } from "../../constants";
import { ClubsModal, AddClubModal } from "../../components";
import { useClub } from "../../context/ClubsProvider";
import "../../css/club.css";
import { Alert } from "../../lib/actions/alert.actions";
import { clubs } from "../../assets";

const AlertMessage = () => {
  const [visible, setVisible] = useState(true);
  const handleDismiss = () => {
    setVisible(false);
  };

  return (
    visible && (
      <div className="alert-message">
        <button onClick={handleDismiss}>Dismiss</button>
      </div>
    )
  );
};

const ClubCard = ({ club, onClick }) => (
  <div className="image-container club-image-container" onClick={onClick}>
    <img src={club.Image} alt={club.altText} />
    <div className="card-title">
      {club.title.split(' ')[0]}<br />{club.title.split(' ')[1]}
    </div>
  </div>
);

const AddClubCard = ({ onClick }) => (
  <div className="image-container club-image-container add-club-card" onClick={onClick}>
    <img src={clubsItems[clubsItems.length - 1].Image} alt="Add New Club" />
  </div>
);

const Clubs = () => {
  const [selectedClub, setSelectedClub] = useState(null);
  const [isAddClubModalOpen, setIsAddClubModalOpen] = useState(false);
  const {Clubs} = useClub();
  const handleCardOpen = (club) => {
    setSelectedClub(club);
  };

  const handleCloseModal = () => {
    setSelectedClub(null);
  };

  const handleAddClubClick = () => {
    setIsAddClubModalOpen(true);
  };

  const handleCloseAddClubModal = () => {
    setIsAddClubModalOpen(false);
  };

  return (
    <>
      <CustomHeader title="Сонирхлын клубууд" />
      <main className="club-container">
        <div className="cards-container">
          {clubsItems.slice(0, -1).map((club, index) => (
            <ClubCard key={index} club={club} onClick={() => handleCardOpen(club)} />
          ))}
          <AddClubCard onClick={handleAddClubClick} />
        </div>
      </main>
      <ClubsModal isOpen={!!selectedClub} onClose={handleCloseModal} club={selectedClub} />
      <AddClubModal isOpen={isAddClubModalOpen} onClose={handleCloseAddClubModal} />
    </>
  );
};

export default Clubs;