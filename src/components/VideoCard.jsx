import { Avatar, Button, Dropdown, Modal, Tooltip } from "antd";
import React from "react";
import { FaPlay } from "react-icons/fa";
import { useTraining } from "../context/TrainProvider";
import { useAuth } from "../context/AuthProvider";
import { checkRole } from "../lib/utils/checkRole";

export const VideoCard = ({
  iframeRef,
  learning,
  showModal,
  closeModal,
  openModal,
  idx,
  isEdit,
  setIsEdit,
  handleTrainingModal,
}) => {
  const { user } = useAuth();
  const { editTrainForm, setSelectedType, trainingTypes, deleteLearningData } =
    useTraining();
  const handleClick = () => {
    setIsEdit(true);
    editTrainForm(learning);
    handleTrainingModal(true);
    const type = trainingTypes.filter(
      (item) => item.ID === learning.CategoryID
    )[0];
    setSelectedType(type.Name);
  };
  const handleDeleteClick = () => {
    deleteLearningData(learning.ID);
  };
  const items = [
    {
      label: "Засах",
      key: "1",
      onClick: handleClick,
    },
    {
      label: "Устгах",
      key: "2",
      danger: true,
      onClick: handleDeleteClick,
    },
  ];
  return (
    <Dropdown
      menu={checkRole(user?.Role) ? { items } : {}}
      trigger={["contextMenu"]}
    >
      <div className="video-card">
        <div
          className="play-container"
          onClick={() => {
            showModal(idx);
          }}
        >
          <FaPlay color="white" size={40} />
        </div>
        <div className="video-desc">
          <div className="video-desc-avatar">
            <Avatar
              src={"data:image/jpeg;base64," + learning?.Image}
              className="video-author-avatar"
              size={50}
            />
          </div>
          <div>
            <p>{learning?.UserName}</p>
            <Tooltip title={learning?.Name}>
              <h4>{learning?.Name}</h4>
            </Tooltip>
          </div>
        </div>
        <Modal
          width="80%"
          className="video-modal"
          centered
          closeIcon={null}
          open={openModal === idx}
          footer={null}
          onClose={closeModal}
          onCancel={closeModal}
        >
          <iframe
            ref={iframeRef}
            allowFullScreen={true}
            title={learning?.Name}
            className="video-frame"
            src={learning?.FileDesc}
          ></iframe>
          <Button onClick={closeModal}>Хаах</Button>
        </Modal>
      </div>
    </Dropdown>
  );
};
