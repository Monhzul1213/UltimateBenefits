import React, { useEffect, useState } from "react";
import CustomHeader from "../../components/CustomHeader";
import CareCard from "../../components/CareCard";
import { cares } from "../../constants";
import "../../css/care.css";

export const Care = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width:1525px)");
    setIsMobile(mediaQuery.matches);
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);
  const [openIdx, setOpenIdx] = useState(null);
  const [hideIdx, setHideIdx] = useState(null);
  const handleCardOpen = (idx) => {
    if (openIdx == idx) {
      setOpenIdx(null);
      setHideIdx(null);
    } else {
      setOpenIdx(idx);
      setHideIdx(isMobile ? null : idx + 1);
    }
  };
  return (
    <>
      <CustomHeader title="Нийгмийн хангамж" />
      <main className="care-container">
        {/* {cares.map((info, idx) => {
          return (
            <CareCard
              setOpenIdx={setOpenIdx}
              openIdx={openIdx}
              key={idx}
              icon={info.icon}
              title={info.title}
              description={info.description}
              type={info.type}
              idx={idx}
            />
          );
        })} */}
        <div className="cards-container">
          <div className="cards">
            <CareCard
              hideIdx={hideIdx}
              handleCardOpen={handleCardOpen}
              setOpenIdx={setOpenIdx}
              openIdx={openIdx}
              idx={0}
              info={cares[0]}
            />
            <CareCard
              hideIdx={hideIdx}
              handleCardOpen={handleCardOpen}
              setOpenIdx={setOpenIdx}
              openIdx={openIdx}
              idx={1}
              info={cares[1]}
            />
          </div>
          <div className="cards">
            <CareCard
              hideIdx={hideIdx}
              handleCardOpen={handleCardOpen}
              setOpenIdx={setOpenIdx}
              openIdx={openIdx}
              idx={3}
              info={cares[2]}
            />
            <CareCard
              hideIdx={hideIdx}
              handleCardOpen={handleCardOpen}
              setOpenIdx={setOpenIdx}
              openIdx={openIdx}
              idx={4}
              info={cares[3]}
            />
          </div>
          <div className="cards cards-last">
            <CareCard
              hideIdx={hideIdx}
              handleCardOpen={handleCardOpen}
              setOpenIdx={setOpenIdx}
              openIdx={openIdx}
              idx={6}
              info={cares[4]}
            />
            <CareCard
              hideIdx={hideIdx}
              handleCardOpen={handleCardOpen}
              setOpenIdx={setOpenIdx}
              openIdx={openIdx}
              idx={7}
              info={cares[5]}
            />
          </div>
        </div>
      </main>
    </>
  );
};
