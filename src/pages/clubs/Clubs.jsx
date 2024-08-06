import React, { useState, useContext } from "react";
import { CustomHeader } from "../../components";
import { ClubsModal, AddClubModal } from "../../components";
import { useClub } from "../../context/ClubsProvider";
import "../../css/club.css";
import { alert } from "../../lib/actions/alert.actions";
import { nemeh } from "../../assets";

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

const ClubCard = ({ club, onClick, onRightClick }) => (
  <div className="image-container club-image-container" onClick={onClick} onContextMenu={onRightClick}>
    <img src={`data:image/png;base64,${club.Image}`} alt={club.Name} />
    <div className="card-title">
      {club.Name.split(' ')[0]}<br />{club.Name.split(' ')[1]}
    </div>
  </div>
);

const AddClubCard = ({ onClick }) => (
  <div className="image-container club-image-container add-club-card" onClick={onClick}>
    <img src={nemeh} alt="Шинэ клуб нэмэх" />
  </div>
);

const Clubs = () => {
  const [selectedClub, setSelectedClub] = useState(null);
  const [isAddClubModalOpen, setIsAddClubModalOpen] = useState(false);
  const [isClubsModalOpen, setIsClubsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, club: null });
  const { clubs, deleteClub, setClubFormEdit } = useClub();

  const handleCardOpen = (club) => {
    setIsClubsModalOpen(true);
    setSelectedClub(club);
    setClubFormEdit(club);
  };

  const handleCloseModal = () => {
    setIsClubsModalOpen(false);
    setIsEditing(false);
  };

  const handleAddClubClick = () => {
    setIsAddClubModalOpen(true);
  };

  const handleCloseAddClubModal = () => {
    setIsAddClubModalOpen(false);
  };

  const handleRightClick = (event, club) => {
    event.preventDefault();
    setContextMenu({ visible: true, x: event.clientX, y: event.clientY, club });
  };

  const handleContextMenuOptionClick = async (option) => {
    if (option === 'Edit') {
      setIsEditing(true);
      setIsClubsModalOpen(true);
      setSelectedClub(contextMenu.club);
      setClubFormEdit(contextMenu.club);
    } else if (option === 'Delete') {
      await deleteClub(contextMenu.club.ID);
    }
    setContextMenu({ visible: false, x: 0, y: 0, club: null });
  };

  const handleModalClick = () => {
    setContextMenu({ visible: false, x: 0, y: 0, club: null });
  };

  return (
    <>
      <CustomHeader title="Сонирхлын клубууд" />
      <main className="club-container" onClick={handleModalClick}>
        <div className="cards-container">
          {clubs?.map((club, ID) => (
            <ClubCard
              key={ID}
              club={club}
              onClick={() => handleCardOpen(club)}
              onRightClick={(event) => handleRightClick(event, club)}
            />
          ))}
          <AddClubCard onClick={handleAddClubClick} />
        </div>
      </main>
      <ClubsModal
        isOpen={isClubsModalOpen}
        onRequestClose={handleCloseModal}
        club={selectedClub}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
      <AddClubModal isOpen={isAddClubModalOpen} onClose={handleCloseAddClubModal} />
      {contextMenu.visible && (
        <ul className="context-menu" style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}>
          <li onClick={() => handleContextMenuOptionClick('Edit')}>Засах</li>
          <li style={{ color: 'red' }} onClick={() => handleContextMenuOptionClick('Delete')}>Устгах</li>
        </ul>
      )}
    </>
  );
};

export default Clubs;
