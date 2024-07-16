import React, { useEffect, useRef, useState } from "react";
import { CustomHeader, Loader, VideoCard } from "../../components";

import "../../css/learning.css";
import { getLearningData } from "../../lib/actions/learning.actions";
import { useAuth } from "../../context/AuthProvider";
import { checkRole } from "../../lib/utils/checkRole";
import { Button } from "antd";
import { IoIosAdd } from "react-icons/io";

export const Learning = () => {
  const iframeRef = useRef(null);
  const { user } = useAuth();

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
        {checkRole(user?.Role) && (
          <div>
            <Button
              size="large"
              style={{ fontWeight: 600 }}
              type="primary"
              icon={<IoIosAdd size={28} />}
            >
              Сургалт нэмэх
            </Button>
          </div>
        )}
        <section className="learning-videos-container">
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
        </section>
      </main>
    </>
  );
};
