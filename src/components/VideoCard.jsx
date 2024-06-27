import { Avatar } from "antd";
import React from "react";

export const VideoCard = ({ video }) => {
  return (
    <div className="video-card">
      <iframe className="video-frame" src={video.url}></iframe>
      <div className="video-desc">
        <Avatar className="video-author-avatar" size={60} />
        <div>
          <p>{video.author}</p>
          <h4>{video.title}</h4>
        </div>
      </div>
    </div>
  );
};
