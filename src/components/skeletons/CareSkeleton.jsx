import { Skeleton } from "antd";
import React from "react";

const CareSkeleton = () => {
  return (
    <div className="care-card care-card-Боломжтой">
      <Skeleton.Image active size="large" round={true} />
      <Skeleton active style={{ marginTop: 20 }} />
    </div>
  );
};

export default CareSkeleton;
