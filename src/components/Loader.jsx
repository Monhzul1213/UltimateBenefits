import { Spin } from "antd";
import React from "react";

export const Loader = () => {
  const contentStyle = {
    padding: 50,
    width: 200,
    background: "rgba(0, 0, 0, 0.05)",
    borderRadius: 4,
  };
  const content = <div style={contentStyle}></div>;
  return (
    <div
      style={{
        width: "100%",
        height: "190px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spin tip="Уншиж байна..." size="large">
        {content}
      </Spin>
    </div>
  );
};
