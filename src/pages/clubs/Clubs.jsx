import React, { useState, useContext } from "react";
import { CustomHeader } from "../../components";
import { ClubsModal, AddClubModal } from "../../components";
import { useClub } from "../../context/ClubsProvider";
import "../../css/club.css";
import { alert } from "../../lib/actions/alert.actions";
import { nemeh } from "../../assets";
import { Dropdown } from "antd";
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

const ClubCard = ({ club, onClick ,deleteClub,setClubFormEdit,setIsEditing,setIsClubsModalOpen}) => {
  const items = [
    {
      label: 'Засах',
      key: '1',
      onClick: () => {
        setClubFormEdit(club);
        setIsEditing(true);
        setIsClubsModalOpen(true);  
      },
    },
    {
      label: 'Устгах',
      key: '2',
      danger:true,
      onClick: () => {
        deleteClub(club.ID);
      },
    },
  ];
  return <Dropdown trigger={["contextMenu"] } menu={{items}}>

  <div className="image-container club-image-container" onClick={onClick} >
    <img src={`data:image/png;base64,${club.Image}`} alt={club.Name} />
    <div className="card-title">
      {club.Name.split(' ')[0]}<br />{club.Name.split(' ')[1]}
    </div>
  </div>
  </Dropdown>
}

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
  const { clubs, deleteClub, setClubFormEdit } = useClub();

  const handleCardOpen = (club) => {
    setIsClubsModalOpen(true);
    setSelectedClub(club);
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
    setClubFormEdit({
      Name: "",
      Contact: "",
      Descr: "",
      Image: "",
    })
  };

  return (
    <>
      <CustomHeader title="Сонирхлын клубууд" />
      <main className="club-container">
        <div className="cards-container">
          {clubs?.map((club, ID) => (
            <ClubCard
              key={ID}
              club={club}
              onClick={() => {handleCardOpen(club)
setIsEditing(false)

              }}
              deleteClub={deleteClub}
              setClubFormEdit={setClubFormEdit}
              setIsEditing={setIsEditing}
              setIsClubsModalOpen={setIsAddClubModalOpen}
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
      <AddClubModal isEditing={isEditing} isOpen={isAddClubModalOpen} onClose={handleCloseAddClubModal} />
    </>
  );
};

export default Clubs;
