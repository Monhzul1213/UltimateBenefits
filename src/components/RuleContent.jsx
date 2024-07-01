import React from "react";

const RuleContent = ({ header, title, desc, content }) => {
  return (
    <div className="page-content ">
      <div className="rules-header">
        <h2>{header}</h2>
      </div>
      <div className="rule-salary-2">
        <h3>{title}</h3>
        <div className="title-border" />
        <p className="title-desc">
          Ажилтан та цалингаа сар бүрийн <span>16</span> урьдчилгаа цалин,
          <span>1</span> сүүл цалин-ний өдөр Худалдаа хөгжлийн банкний цалингийн
          дансаар авна.
        </p>
        {content}
      </div>
      <div className="rules-footer">
        <p>Ultimate family - whitepaper</p>
      </div>
    </div>
  );
};

export default RuleContent;
