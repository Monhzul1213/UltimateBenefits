import { Avatar, Button, Modal } from "antd";
import React from "react";
import { FaPlay } from "react-icons/fa";

export const VideoCard = ({
  iframeRef,
  learning,
  showModal,
  closeModal,
  openModal,
  idx,
}) => {
  const stopVideo = () => {
    if (iframeRef.current) {
      iframeRef.current.src = learning.FileDesc;
    }
  };
  return (
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
  );
};
