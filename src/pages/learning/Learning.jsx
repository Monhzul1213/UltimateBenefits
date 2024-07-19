import React, { useEffect, useRef, useState } from "react";
import {
  CustomHeader,
  Loader,
  TrainingFileCard,
  VideoCard,
} from "../../components";

import "../../css/learning.css";
import { useAuth } from "../../context/AuthProvider";
import { checkRole } from "../../lib/utils/checkRole";
import { Button } from "antd";
import { IoIosAdd } from "react-icons/io";
import TrainingModal from "../../components/TrainingModal";
import { useTraining } from "../../context/TrainProvider";
import { IoReload } from "react-icons/io5";
import { nemeh } from "../../assets";

export const Learning = () => {
  const iframeRef = useRef(null);
  const { user } = useAuth();
  const {
    learningDatas,
    loading,
    isFailed,
    getLearningData,
    getTrainingType,
    trainingTypes,
    handleSelectedCategory,
    selectedCategory,
  } = useTraining();
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
    getLearningData(1);
    getTrainingType();
  }, []);

  return (
    <>
      <CustomHeader title="Сургалтын материал" />

      <main className="learning-container">
        <div className="training-categorys-container">
          {trainingTypes?.map((item, index) => (
            <div
              onClick={() => {
                getLearningData(item.ID);
                handleSelectedCategory(item.ID);
              }}
              key={index}
              className={`training-category ${
                selectedCategory == item.ID && "training-category-selected"
              }`}
            >
              <h2>{item.Name}</h2>
            </div>
          ))}
        </div>
        <section className="learning-videos-container">
          {loading ? (
            <Loader />
          ) : isFailed ? (
            <div className="employee-error">
              <p>Алдаа гарлаа</p>
              <Button
                onClick={() => {
                  getLearningData(1);
                  getTrainingType();
                }}
                icon={<IoReload />}
              >
                Дахин оролдох
              </Button>
            </div>
          ) : (
            <>
              {learningDatas?.map((learning, idx) => {
                if (learning.IsFile == "Y") {
                  return <TrainingFileCard key={idx} learning={learning} />;
                } else {
                  return (
                    <VideoCard
                      iframeRef={iframeRef}
                      idx={idx}
                      showModal={showModal}
                      closeModal={closeModal}
                      openModal={openModal}
                      key={idx}
                      learning={learning}
                    />
                  );
                }
              })}
              {checkRole(user?.Role) && (
                <img
                  onClick={() => {
                    setAddModal(true);
                  }}
                  className="training-add"
                  src={nemeh}
                  alt=""
                />
              )}
            </>
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
