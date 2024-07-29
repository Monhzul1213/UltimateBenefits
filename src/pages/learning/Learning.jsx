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
import { Button, Dropdown } from "antd";
import TrainingModal from "../../components/TrainingModal";
import { useTraining } from "../../context/TrainProvider";
import { IoReload } from "react-icons/io5";
import { nemeh } from "../../assets";
import Swal from "sweetalert2";
import TrainEditModal from "../../components/TrainEditModal";

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
    deleteTrainingType,
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
  const handleDelete = (id) => {
    Swal.fire({
      title: "Та уг үйлдлийг хийхдээ итгэлтэй байна уу?",
      text: "Уг категориг устгаснаар доторх бүх файл болон мэдээллүүд устах болно",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Үгүй",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Тийм",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTrainingType(id);
      }
    });
  };
  const [editModal, setEditModal] = useState(false);
  const [selectedTrainType, setSelectedTrainType] = useState();
  const [prevName, setPrevName] = useState("");
  return (
    <>
      <CustomHeader title="Сургалтын материал" />

      <main className="learning-container">
        <div className="learning-page">
          <div className="training-categorys-container">
            {trainingTypes?.map((item, index) => (
              <Dropdown
                menu={{
                  items: [
                    {
                      label: "Засах",
                      key: "1",
                      onClick: () => {
                        setPrevName(item.Name);
                        setEditModal(true);
                        setSelectedTrainType(item.ID);
                      },
                    },
                    {
                      label: "Устгах",
                      key: "2",
                      danger: true,
                      onClick: () => {
                        handleDelete(item.ID);
                      },
                    },
                  ],
                }}
                key={index}
                trigger={["contextMenu"]}
              >
                <div
                  onClick={() => {
                    getLearningData(item.ID);
                    handleSelectedCategory(item.ID);
                  }}
                  className={`training-category ${
                    selectedCategory === item.ID && "training-category-selected"
                  }`}
                >
                  <h2>{item.Name}</h2>
                </div>
              </Dropdown>
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
                  if (learning.IsFile === "Y") {
                    return (
                      <TrainingFileCard
                        key={idx}
                        learning={learning}
                        setIsEdit={setIsEdit}
                        isEdit={isEdit}
                        handleTrainingModal={handleTrainingModal}
                      />
                    );
                  } else {
                    return (
                      <VideoCard
                        iframeRef={iframeRef}
                        idx={idx}
                        showModal={showModal}
                        closeModal={closeModal}
                        openModal={openModal}
                        key={idx}
                        setIsEdit={setIsEdit}
                        isEdit={isEdit}
                        learning={learning}
                        handleTrainingModal={handleTrainingModal}
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
        </div>
      </main>
      <TrainingModal
        addModal={addModal}
        isEdit={isEdit}
        handleTrainingModal={handleTrainingModal}
        setIsEdit={setIsEdit}
      />
      <TrainEditModal
        setPrevName={setPrevName}
        prevName={prevName}
        selectedTrainType={selectedTrainType}
        editModal={editModal}
        setEditModal={setEditModal}
      />
    </>
  );
};
