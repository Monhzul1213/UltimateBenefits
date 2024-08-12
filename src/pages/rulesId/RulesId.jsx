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
import { IoArrowBack, IoReload } from "react-icons/io5";
import { useRule } from "../../context/RuleProvider";
import TrainSkeleton from "../../components/skeletons/TrainSkeleton";
import { Button, Input } from "antd";
import { IoIosSearch } from "react-icons/io";

const RulesIdPage = () => {
  const iframeRef = useRef(null);
  const { user } = useAuth();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const [originData, setOriginData] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const { getRuleDetail, setGetRuleDetail } = useRule();
  const [videoModal, setVideoModal] = useState(-1);
  const showModal = (index) => {
    setVideoModal(index);
  };
  const closeModal = () => {
    setVideoModal(-1);
  };
  const search = (e) => {
    const searchResults = originData?.filter((data) => {
      const name = data.Name.toLowerCase();
      const searchV = e.target.value.toLowerCase();
      return name.includes(searchV);
    });
    setData(searchResults);
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
        setOriginData(data.result);
      } catch (error) {
        setError(true);
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
          <div className="rule-id-back">
            <Link to="/rules">
              <IoArrowBack size={30} />
            </Link>
            <h1
              style={{
                marginLeft: "30px",
                textTransform: "uppercase",
                fontSize: "30px",
                fontWeight: "500",
              }}
            >
              {categoryName}
            </h1>
            <Input
              prefix={<IoIosSearch size={24} color="gray" />}
              style={{ width: "300px", marginLeft: "30px", fontSize: "20px" }}
              placeholder="Нэрээр хайх"
              onChange={search}
            />
          </div>

          <main className="learning-videos-container">
            {loading ? (
              <>
                <TrainSkeleton />
                <TrainSkeleton />
                <TrainSkeleton />
                <TrainSkeleton />
              </>
            ) : error ? (
              <div className="employee-error">
                <p>Алдаа гарлаа</p>
                <Button
                  onClick={() => {
                    // getRuleDetail()
                    setGetRuleDetail(!getRuleDetail);
                  }}
                  icon={<IoReload />}
                >
                  Дахин оролдох
                </Button>
              </div>
            ) : (
              ""
            )}

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
