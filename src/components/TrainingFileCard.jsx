import { Avatar } from "antd";
import {
  downloadFile,
  excelBack,
  excelIcon,
  pdfBack,
  pdfIcon,
  wordBack,
  wordIcon,
} from "../assets";

export const TrainingFileCard = ({ learning }) => {
  const handleDownloadFile = () => {
    const fileName = learning?.FileDesc.split("/").pop();
    console.log("filename", fileName);
    const aTag = document.createElement("a");
    aTag.href = learning?.FileDesc.replace("./public/training/", "/training/");
    console.log("href", aTag.href);
    aTag.setAttribute("download", fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };
  return (
    <div className="video-card">
      <div className="training-file-card">
        {learning.FileType === "pdf" && (
          <>
            <img
              className="training-file-image"
              src={pdfBack}
              alt="training-file-image"
            />
            <img className="training-file-icon" src={pdfIcon} alt="" />
          </>
        )}
        {learning.FileType === "doc" && (
          <>
            <img
              className="training-file-image"
              src={wordBack}
              alt="training-file-image"
            />
            <img className="training-file-icon" src={wordIcon} alt="" />
          </>
        )}

        {learning.FileType === "xlsx" && (
          <>
            <img
              className="training-file-image"
              src={excelBack}
              alt="training-file-image"
            />
            <img className="training-file-icon" src={excelIcon} alt="" />
          </>
        )}
        <p className="training-file-title">{learning.Name}</p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="video-desc">
          <Avatar
            src={learning?.Picture.replace("./public/upload/", "/upload/")}
            className="video-author-avatar"
            size={60}
          />
          <div>
            <p>{learning.UserName}</p>
            <h4>{learning.Name}</h4>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <img
            onClick={handleDownloadFile}
            className="downloadfile-icon"
            src={downloadFile}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
