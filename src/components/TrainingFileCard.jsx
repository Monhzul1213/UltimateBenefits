import { Avatar, Button, Modal } from "antd";
import React from "react";
import { FaPlay } from "react-icons/fa";
import { excelBack, excelIcon, pdfBack, wordBack } from "../assets";

export const TrainingFileCard = ({ learning }) => {
  return (
    <div className="video-card">
      <div className="training-file-card">
        {/* <img
          className="training-file-image"
          src={pdfBack}
          alt="training-file-image"
        />
        <img
          className="training-file-image"
          src={wordBack}
          alt="training-file-image"
        /> */}
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
    </div>
  );
};
