import { Modal } from "antd";
import React, { useState } from "react";
import { useCare } from "../context/CareProvider";
import { FaXmark } from "react-icons/fa6";

const CareDetailWatch = ({ watchModal, setWatchModal, watchTitle }) => {
  const { careDetail } = useCare();
  return (
    <Modal
      centered
      width={careDetail?.length <= 2 ? 500 * careDetail?.length : 1000}
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
            {careDetail?.map((detail) => {
              return (
                <div className="detail-one">
                  <div className="detail-name">
                    <h4>{detail?.Name.toUpperCase()}</h4>
                  </div>
                  <div
                    className="detail-html"
                    dangerouslySetInnerHTML={{ __html: detail.Text }}
                  ></div>
                </div>
              );
            })}
          </section>
        </div>
      </div>
    </Modal>
  );
};

export default CareDetailWatch;
