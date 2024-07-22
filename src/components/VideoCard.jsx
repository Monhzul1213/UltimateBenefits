import { Avatar, Button, Dropdown, Modal } from "antd";
import React from "react";
import { FaPlay } from "react-icons/fa";
import { useTraining } from "../context/TrainProvider";

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
    <Dropdown menu={{ items }} trigger={["contextMenu"]}>
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
          <Avatar
            src={learning?.Picture.replace("./public/upload/", "/upload/")}
            className="video-author-avatar"
            size={60}
          />
          <div>
            <p>{learning.UserName}</p>
            <h4>{learning.Name}</h4>
          </div>
        </div>
        <Modal
          width="80%"
          className="video-modal"
          centered
          closeIcon={null}
          open={openModal === idx}
          footer={null}
        >
          <iframe
            ref={iframeRef}
            allowFullScreen={true}
            title={learning.Name}
            className="video-frame"
            src={learning.FileDesc}
          ></iframe>
          <Button onClick={closeModal}>Хаах</Button>
        </Modal>
      </div>
    </Dropdown>
  );
};
