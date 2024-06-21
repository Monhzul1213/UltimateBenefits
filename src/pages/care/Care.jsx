import React, { useState } from "react";
import CustomHeader from "../../components/CustomHeader";
import CareCard from "../../components/CareCard";
import { cares } from "../../constants";
import "../../css/care.css";

export const Care = () => {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <>
      <CustomHeader title="Нийгмийн хангамж" />
      <main className="care-container">
        {cares.map((info, idx) => {
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
        })}
      </main>
    </>
  );
};
