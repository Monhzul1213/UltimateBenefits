import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles

const MyEditor = ({ handleDetailForm, value }) => {
  const handlechange = (e) => {
    handleDetailForm("Text", e);
  };
  return (
    <div>
      <ReactQuill
        style={{ height: "200px" }}
        value={value}
        onChange={handlechange}
      />
      {/* <div>
        <h3>Output:</h3>
        <div dangerouslySetInnerHTML={{ __html: value }} />
      </div> */}
    </div>
  );
};

export default MyEditor;
