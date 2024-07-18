import React, { useEffect, useRef, useState } from "react";
import { CustomHeader, Loader, VideoCard } from "../../components";

import "../../css/learning.css";
import { useAuth } from "../../context/AuthProvider";
import { checkRole } from "../../lib/utils/checkRole";
import { Button } from "antd";
import { IoIosAdd } from "react-icons/io";
import TrainingModal from "../../components/TrainingModal";
import { useTraining } from "../../context/TrainProvider";
import { IoReload } from "react-icons/io5";

export const Learning = () => {
  const iframeRef = useRef(null);
  const { user } = useAuth();
  const { learningDatas, loading, isFailed, getLearningData, getTrainingType } =
    useTraining();
  const [addModal, setAddModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openModal, setOpenModal] = useState(-1);
  const handleTrainingModal = (isOpen) => {
    setAddModal(isOpen);
  };
  const showModal = (index) => {
    setOpenModal(index);
  };
  const closeModal = () => {
    setOpenModal(-1);
  };
  useEffect(() => {
    getLearningData();
    getTrainingType();
  }, []);

  return (
    <>
      <CustomHeader title="Сургалтын материал" />

      <main className="learning-container">
        {checkRole(user?.Role) && (
          <div>
            <Button
              size="large"
              style={{ fontWeight: 600 }}
              type="primary"
              icon={<IoIosAdd size={28} />}
              onClick={() => {
                setAddModal(true);
              }}
            >
              Сургалт нэмэх
            </Button>
          </div>
        )}
        <section className="learning-videos-container">
          {loading ? (
            <Loader />
          ) : isFailed ? (
            <div className="employee-error">
              <p>Алдаа гарлаа</p>
              <Button
                onClick={() => {
                  getLearningData();
                  getTrainingType();
                }}
                icon={<IoReload />}
              >
                Дахин оролдох
              </Button>
            </div>
          ) : (
            learningDatas?.map((learning, idx) => (
              <VideoCard
                iframeRef={iframeRef}
                idx={idx}
                showModal={showModal}
                closeModal={closeModal}
                openModal={openModal}
                key={idx}
                learning={learning}
              />
            ))
          )}
        </section>
      </main>
      <TrainingModal
        addModal={addModal}
        isEdit={isEdit}
        handleTrainingModal={handleTrainingModal}
      />
    </>
  );
};
