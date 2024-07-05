import React, { useState } from "react";
import { CustomHeader } from "../../components";
import * as XLSX from "xlsx";

export const Employees = () => {
  const [data, setData] = React.useState(null);
  const [headers, setHeaders] = useState([]);
  const [empForm, setEmpForm] = useState({
    UserID: "",
    CpnyID: "",
    LastName: "",
    FirstName: "",
    Department: "",
    Position: "",
    BirthDate: "",
    Email: "",
    PhoneNumber: "",
    Address: "",
    HireDate: "",
    Role: "",
    Status: "A",
  });

  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
      console.log("SHEET DATA", parsedData);
      formatData(parsedData);
    };
  };
  const formatData = (data) => {
    data.map((row) => {
      Object.values(row).map((item, index) => {
        // console.log("item", item);
        // setEmpForm((prevState) => ({
        //   ...prevState,
        //   userID: index === 1 && item,
        // }));
      });
    });
    console.log("EMP", empForm);
  };
  return (
    <>
      <CustomHeader title="Ажилтнууд" />
      <div>
        <input type="file" onChange={handleFileUpload} />
      </div>
      <div>
        <table>
          <thead>
            <tr>
              {data &&
                Object.values(data[0])?.map((item, idx) => (
                  <th key={idx}>{item}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((row, idx) => (
              <tr key={idx}>
                {Object.values(row).map((item, idx) => (
                  <td key={idx}>{item}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
