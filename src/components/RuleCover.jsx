import React from "react";

const RuleCover = ({ title, lists }) => {
  return (
    <div className="page-cover rule-salary-1">
      <div>
        <h2>{title}</h2>
        <ul>
          <div className="page-style-dot" />
          {lists.map((list) => (
            <li>{list}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RuleCover;
