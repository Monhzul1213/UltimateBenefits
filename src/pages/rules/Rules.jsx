import HTMLFlipBook from "react-pageflip";
import { CustomHeader } from "../../components";
import "../../css/rule.css";
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";

import { day01, day16 } from "../../assets";
import RuleCover from "../../components/RuleCover";
import RuleContent from "../../components/RuleContent";
import { useEffect, useRef, useState } from "react";
import { Button } from "antd";

const ruleSalaryContent = () => (
  <div className="rule-desc">
    <div className="rule-date">
      <img className="calendar-image" src={day16} alt="day16" />
      <p>
        <span>16</span>-ны өдрийн цалин нийт цалингийн
        <span>50%</span> байна.
      </p>
    </div>
    <div className="rule-date">
      <img src={day01} alt="day01" />
      <p>
        <span>1</span>-ний өдрийн сарын сүүл цалингаас
        <span>НДШ, ХХОАТ</span> болон бусад суутгал шимтгэлийг суутгаж,
        шаардлагтай нэмэгдлийг нэмж олгоно.
      </p>
    </div>
  </div>
);

export const Rules = () => {
  const [dimensions, setDimensions] = useState({ width: 500, height: 650 });
  const flipBook = useRef(null);
  const handleNextPage = () => {
    if (flipBook.current) {
      flipBook.current.pageFlip().flipNext();
    }
  };

  const handlePreviousPage = () => {
    if (flipBook.current) {
      flipBook.current.pageFlip().flipPrev();
    }
  };
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth < 1000 ? window.innerWidth - 80 : 500;
      setDimensions({ width });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <CustomHeader title="Дүрэм журам" />
      <main className="rules-container">
        <HTMLFlipBook
          ref={flipBook}
          width={dimensions.width}
          height={600}
          minHeight={400}
          maxShadowOpacity={0.5}
          mobileScrollSupport={true}
        >
          <div style={{ width: "100%", height: "100%" }}>
            <RuleCover
              title="Цалин хөлс"
              lists={[
                "Цалин / үндсэн, нэмэгдэл, хангамж, урамшуулал, хуримтлуулах",
                "Цалин хэзээ хэрхэн авах вэ?",
              ]}
            />
          </div>
          <div>
            <RuleContent
              header="Цалин хөлс"
              title="Цалин хэзээ, хэрхэн авах вэ?"
              content={ruleSalaryContent()}
            />
          </div>
          <div style={{ width: "100%", height: "100%" }}>
            <RuleCover
              title="Цалин хөлс"
              lists={[
                "Цалин / үндсэн, нэмэгдэл, хангамж, урамшуулал, хуримтлуулах",
                "Цалин хэзээ хэрхэн авах вэ?",
              ]}
            />
          </div>
          <div>
            <RuleContent
              header="Цалин хөлс"
              title="Цалин хэзээ, хэрхэн авах вэ?"
              content={ruleSalaryContent()}
            />
          </div>
        </HTMLFlipBook>
      </main>

      <div className="flip-page-buttons">
        <Button type="primary" onClick={handlePreviousPage}>
          <BiSolidLeftArrow size={25} />
        </Button>
        <Button type="primary" onClick={handleNextPage}>
          <BiSolidRightArrow size={25} />
        </Button>
      </div>
    </>
  );
};
