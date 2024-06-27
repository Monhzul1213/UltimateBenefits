import HTMLFlipBook from "react-pageflip";
import { CustomHeader } from "../../components";
import "../../css/rule.css";

export const Rules = () => {
  return (
    <>
      <CustomHeader title="Дүрэм журам" />
      <main className="rules-container">
        <HTMLFlipBook
          width={550}
          height={570}
          maxShadowOpacity={0.5}
          mobileScrollSupport={true}
        >
          <div className="page-cover rule-salary-1">
            <div>
              <h2>Цалин хөлс</h2>
              <ul>
                <div className="page-style-dot" />
                <li>
                  Цалин / үндсэн, нэмэгдэл, хангамж, урамшуулал, хуримтлуулах
                </li>
                <li>Цалин хэзээ хэрхэн авах вэ?</li>
              </ul>
            </div>
          </div>
          <div className="page-content rule-salary-2">
            <div>
              <h2>Цалин хөлс</h2>
            </div>
            <div>
              <h3>Цалин хэзээ, хэрхэн авах вэ?</h3>
              <p>
                Ажилтан та цалингаа сар бүрийн <span>16</span> урьдчилгаа цалин,
                <span>1</span> сүүл цалин-ний өдөр Худалдаа хөгжлийн банкний
                цалингийн дансаар авна.
              </p>
              <div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
          <div className="page-cover rule-salary-1">
            <div>
              <h2>Цалин хөлс</h2>
              <ul>
                <div className="page-style-dot" />
                <li>
                  Цалин / үндсэн, нэмэгдэл, хангамж, урамшуулал, хуримтлуулах
                </li>
                <li>Цалин хэзээ хэрхэн авах вэ?</li>
              </ul>
            </div>
          </div>
          <div className="page-content rule-salary-2">
            <div>
              <h2>Цалин хөлс</h2>
            </div>
            <div>
              <h3>Цалин хэзээ, хэрхэн авах вэ?</h3>
              <p>
                Ажилтан та цалингаа сар бүрийн <span>16</span> урьдчилгаа цалин,
                <span>1</span> сүүл цалин-ний өдөр Худалдаа хөгжлийн банкний
                цалингийн дансаар авна.
              </p>
              <div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
          <div className="page-cover rule-salary-1">
            <div>
              <h2>Цалин хөлс</h2>
              <ul>
                <div className="page-style-dot" />
                <li>
                  Цалин / үндсэн, нэмэгдэл, хангамж, урамшуулал, хуримтлуулах
                </li>
                <li>Цалин хэзээ хэрхэн авах вэ?</li>
              </ul>
            </div>
          </div>
          <div className="page-content rule-salary-2">
            <div>
              <h2>Цалин хөлс</h2>
            </div>
            <div>
              <h3>Цалин хэзээ, хэрхэн авах вэ?</h3>
              <p>
                Ажилтан та цалингаа сар бүрийн <span>16</span> урьдчилгаа цалин,
                <span>1</span> сүүл цалин-ний өдөр Худалдаа хөгжлийн банкний
                цалингийн дансаар авна.
              </p>
              <div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </HTMLFlipBook>
      </main>
    </>
  );
};
