import React, { useEffect, useRef, useState } from "react";
import { CustomHeader, Loader, VideoCard } from "../../components";

import "../../css/learning.css";
import { getLearningData } from "../../lib/actions/learning.actions";

export const Learning = () => {
  const iframeRef = useRef(null);

  const [openModal, setOpenModal] = useState(-1);
  const showModal = (index) => {
    setOpenModal(index);
  };

  const closeModal = () => {
    setOpenModal(-1);
  };

  const [learningDatas, setLearningDatas] = useState();
  const [loading, setIsLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      const data = await getLearningData();
      setLearningDatas(data);
      setIsLoading(false);
    };
    getData();
  }, []);
  return (
    <>
      <CustomHeader title="Сургалтын материал" />
      <main className="learning-container">
        {loading ? (
          <Loader />
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
      </main>
    </>
  );
};
