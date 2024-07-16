import { ConfigProvider, Table } from "antd";
import React from "react";
import { FaUserEdit } from "react-icons/fa";
import { useEmployee } from "../context/EmployeeProvider";

const EmpTable = ({ empForm, setOpen, setIsEdit }) => {
  const { setEmpFormEdit } = useEmployee();
  const handleEdit = (info) => {
    setOpen(true);
    setEmpFormEdit(info);
    setIsEdit(true);
  };
  const columns = [
    {
      title: "Регистерийн дугаар",
      dataIndex: "RegisterNumber",
      key: "RegisterNumber",
      width: 125,
      // responsive: ["xl"],
    },
    {
      title: "Компани",
      dataIndex: "CpnyID",
      key: "CpnyID",
      width: 100,
      // responsive: ["xl"],
    },
    {
      title: "Овог",
      dataIndex: "LastName",
      key: "LastName",
      width: 125,
      // responsive: ["lg"],
    },
    {
      title: "Нэр",
      dataIndex: "FirstName",
      key: "FirstName",
      width: 130,
      fixed: "left",
    },
    {
      title: "Хэлтэс",
      dataIndex: "Department",
      key: "Department",
      width: 150,
      // responsive: ["xl"],
    },
    {
      title: "Албан тушаал",
      dataIndex: "Position",
      key: "Position",
      width: 150,
      // responsive: ["xl"],
    },
    {
      title: "Төрсөн өдөр",
      dataIndex: "BirthDate",
      key: "BirthDate",
      width: 110,
    },
    {
      title: "Хүйс",
      dataIndex: "Gender",
      key: "Gender",
      width: 92,
      // responsive: ["lg"],
      render: (text) => <p>{text === "M" ? "Эрэгтэй" : "Эмэгтэй"}</p>,
    },
    {
      title: "Имэйл хаяг",
      dataIndex: "Email",
      key: "Email",
      width: 95,
    },
    {
      title: "Утасны дугаар",
      dataIndex: "PhoneNumber",
      key: "PhoneNumber",
      width: 105,
    },
    {
      title: "Гэрийн хаяг",
      dataIndex: "Address",
      key: "Address",
      width: 120,
      // responsive: ["xl"],
    },
    {
      title: "Ажилд орсон огноо",
      dataIndex: "HireDate",
      key: "HireDate",
      width: 110,
    },
    {
      title: "Эрх",
      dataIndex: "Role",
      key: "Role",
      width: 75,
      // responsive: ["xl"],
    },
    {
      title: "Төлөв",
      dataIndex: "Status",
      key: "Status",
      width: 100,
      render: (text) => <p>{text == "A" ? "Идэвхтэй" : "Идэвхгүй"}</p>,
    },
    {
      title: "Засах",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (info) => (
        <div
          onClick={() => handleEdit(info)}
          style={{ textAlign: "center", cursor: "pointer" }}
        >
          <FaUserEdit size={30} />
        </div>
      ),
    },
  ];
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "#f0f8ff",
            headerColor: "gray",
            rowHoverBg: "#edf2f7",
          },
        },
      }}
    >
      <Table
        bordered
        pagination={false}
        dataSource={empForm}
        columns={columns}
        scroll={{
          y: 653,
          x: 800,
        }}
      />
    </ConfigProvider>
  );
};

export default EmpTable;
