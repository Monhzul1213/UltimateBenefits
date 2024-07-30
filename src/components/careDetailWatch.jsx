import { Dropdown, Modal } from "antd";
import React, { useState } from "react";
import { useCare } from "../context/CareProvider";
import { FaXmark } from "react-icons/fa6";

const CareDetailWatch = ({
  watchModal,
  setWatchModal,
  watchTitle,
  handleDetailModal,
}) => {
  const { careDetail, deleteCareDetail, setDetailEdit, setCareDetailForm } =
    useCare();

  return (
    <Modal
      centered
      width={careDetail?.length >= 2 ? 1000 : 500}
      footer={null}
      closable={false}
      open={watchModal}
      onClose={() => {
        setWatchModal(false);
      }}
    >
      <div className="detail-container">
        <div
          onClick={() => {
            setWatchModal(false);
          }}
          className="detail-close-button"
        >
          <FaXmark size={30} />
        </div>
        <h1 className="detail-title">{watchTitle}</h1>
        <div className="detail-section-container">
          <section className="detail-section">
            {careDetail?.length === 0
              ? "Мэдээлэл байхгүй байна"
              : careDetail?.map((detail) => {
                  return (
                    <Dropdown
                      menu={{
                        items: [
                          {
                            label: "Засах",
                            key: "1",
                            onClick: () => {
                              setDetailEdit(true);
                              setCareDetailForm(detail);
                              handleDetailModal(true);
                              setWatchModal(false);
                            },
                          },
                          {
                            label: "Устгах",
                            key: "2",
                            danger: true,
                            onClick: () => {
                              deleteCareDetail(detail.ID);
                              setWatchModal(false);
                            },
                          },
                        ],
                      }}
                      trigger={["contextMenu"]}
                    >
                      <div className="detail-one">
                        <div className="detail-name">
                          <h4>{detail?.Name.toUpperCase()}</h4>
                        </div>
                        <div
                          className="detail-html"
                          dangerouslySetInnerHTML={{ __html: detail.Text }}
                        ></div>
                      </div>
                    </Dropdown>
                  );
                })}
          </section>
        </div>
      </div>
    </Modal>
  );
};

export default CareDetailWatch;
