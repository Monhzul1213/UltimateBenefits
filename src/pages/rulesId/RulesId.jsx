import React, { useEffect, useRef, useState } from "react";
import {
  CustomHeader,
  Loader,
  RuleFileCard,
  RuleVideoCard,
} from "../../components";
import { Link, useParams } from "react-router-dom";
import myAxios from "../../lib/axios";
import { checkRole } from "../../lib/utils/checkRole";
import { useAuth } from "../../context/AuthProvider";
import { add_card } from "../../assets";
import RuleAddModal from "../../components/rules/RuleAddModal";
import { IoArrowBack } from "react-icons/io5";
import { useRule } from "../../context/RuleProvider";

const RulesIdPage = () => {
  const iframeRef = useRef(null);
  const { user } = useAuth();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const { getRuleDetail } = useRule();
  const [videoModal, setVideoModal] = useState(-1);
  const showModal = (index) => {
    setVideoModal(index);
  };
  const closeModal = () => {
    setVideoModal(-1);
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await myAxios.get(`/api/rules?CategoryID=${id}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
          },
        });
        setCategoryName(data.CategoryName);
        setData(data.result);
        console.log(data);
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [id, getRuleDetail]);
  //Modal
  const [open, setOpen] = useState(false);
  const handleModal = (value) => {
    setOpen(value);
  };
  return (
    <>
      <CustomHeader title="Дүрэм журам" />
      <section className="learning-container">
        <div className="learning-page">
          <Link to="/rules">
            <div className="rule-id-back">
              <IoArrowBack size={20} />
              <h1>Буцах</h1>
              <h1 style={{ marginLeft: "30px", textTransform: "uppercase" }}>
                {categoryName}
              </h1>
            </div>
          </Link>

          <main className="learning-videos-container">
            {loading ? <Loader /> : error ? "" : ""}
            {data?.map((rule, idx) => {
              if (rule.IsFile === "Y") {
                return (
                  <RuleFileCard
                    key={idx}
                    learning={rule}
                    handleModal={handleModal}
                  />
                );
              } else {
                return (
                  <RuleVideoCard
                    iframeRef={iframeRef}
                    idx={idx}
                    showModal={showModal}
                    closeModal={closeModal}
                    openModal={videoModal}
                    key={idx}
                    learning={rule}
                    handleModal={handleModal}
                  />
                );
              }
            })}
            {checkRole(user.Role) & !loading & !error ? (
              <img
                src={add_card}
                onClick={() => {
                  handleModal(true);
                }}
                className="training-add"
              />
            ) : (
              ""
            )}
          </main>
          <RuleAddModal open={open} handleAddModal={handleModal} id={id} />
        </div>
      </section>
    </>
  );
};

export default RulesIdPage;
