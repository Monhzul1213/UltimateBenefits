import React from "react";
import { CustomHeader } from "../../components";

export const NewRules = () => {
  return (
    <>
      <CustomHeader title="Дүрэм журам" />
      <div>
        <div
          style={{
            width: "100%",
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <iframe
            src="https://online.publuu.com/588551/1320339/page/1?embed&transparent"
            width="100%"
            height="600"
            scrolling="no"
            frameborder="0"
            allowfullscreen=""
            allow="clipboard-write"
            class="publuuflip"
          ></iframe>
        </div>
      </div>
    </>
  );
};
