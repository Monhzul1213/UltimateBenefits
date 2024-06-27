import React from "react";
import { CustomHeader, VideoCard } from "../../components";
import { learnVideos } from "../../constants";

import "../../css/learning.css";

export const Learning = () => {
  return (
    <>
      <CustomHeader title="Сургалтын материал" />
      <main className="learning-container">
        {learnVideos.map((video, idx) => (
          <VideoCard key={video.title + idx} video={video} />
        ))}
      </main>
    </>
  );
};
