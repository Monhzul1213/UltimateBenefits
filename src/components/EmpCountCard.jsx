import React from "react";
import { LuUser } from "react-icons/lu";

const EmpCountCard = ({ title, count }) => {
  return (
    <div className="employee-count-card">
      <div className="employee-count-card-icon">
        <LuUser size={40} />
      </div>
      <div className="employee-count-card-info">
        <p>{title}</p>
        <h3>{count}</h3>
      </div>
    </div>
  );
};

export default EmpCountCard;
