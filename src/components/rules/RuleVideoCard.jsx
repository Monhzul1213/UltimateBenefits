import { Avatar, Button, Dropdown, Modal, Tooltip } from "antd";
import React from "react";
import { FaPlay } from "react-icons/fa";
import { useTraining } from "../../context/TrainProvider";
import { useAuth } from "../../context/AuthProvider";
import { checkRole } from "../../lib/utils/checkRole";
import { useRule } from "../../context/RuleProvider";

export const RuleVideoCard = ({
  iframeRef,
  learning,
  showModal,
  closeModal,
  openModal,
  idx,
  handleModal,
}) => {
  const { user } = useAuth();
  const { deleteRuleDetail, setRuleDetailForm, setEditDetail } = useRule();
  const handleClick = () => {
    setRuleDetailForm(learning);
    setEditDetail(true);
    handleModal(true);
  };
  const handleDeleteClick = () => {
    deleteRuleDetail(learning.ID);
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
      menu={
        checkRole(user?.Role)
          ? { items }
          : {
              items: [
                {
                  label: "Бичлэг үзэх",
                  key: "1",
                  onClick: () => {
                    showModal(idx);
                  },
                },
              ],
            }
      }
      trigger={["contextMenu"]}
    >
      <div className="video-card">
        <div className="play-container ">
          <iframe
            className="video-thumbnail"
            ref={iframeRef}
            allowFullScreen={true}
            title={learning?.Name}
            src={learning?.FileDesc}
          ></iframe>
          <div
            onClick={() => {
              showModal(idx);
            }}
            className="video-thumbnail-cover"
          />
          {/* <FaPlay color="white" size={40} /> */}
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
