import { Skeleton } from "antd";
import React from "react";

const TrainSkeleton = () => {
  return (
    <div className="video-card">
      <div className="">
        <Skeleton.Image
          active
          style={{ width: "400px", height: "223px" }}
          shape="square"
        />
      </div>
      <div className="video-desc">
        <Skeleton.Avatar active size="large" />
        <Skeleton active paragraph={{ rows: 1 }} />
      </div>
    </div>
  );
};

export default TrainSkeleton;
