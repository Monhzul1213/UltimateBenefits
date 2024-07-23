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
      responsive: ["xl"],
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
      filterSearch: true,
      render: (text) => <p style={{ fontSize: 14 }}>{text}</p>,
      filters: [
        {
          text: "Захиргаа, үйл ажиллагааны алба",
          value: "Захиргаа, үйл ажиллагааны алба",
        },
        {
          text: "Програм хангамжийн хөгжүүлэлтийн алба",
          value: "Програм хангамжийн хөгжүүлэлтийн алба",
        },
        {
          text: "Програм хангамжийн үйл ажиллагаа хариуцсан алба",
          value: "Програм хангамжийн үйл ажиллагаа хариуцсан алба",
        },
      ],
      onFilter: (value, record) => record.Department.indexOf(value) === 0,
      responsive: ["xl"],
    },
    {
      title: "Албан тушаал",
      dataIndex: "Position",
      key: "Position",
      width: 150,
      render: (text) => <p style={{ fontSize: 14 }}>{text}</p>,
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
      filterSearch: true,
      filters: [
        {
          text: "Эрэгтэй",
          value: "M",
        },
        {
          text: "Эмэгтэй",
          value: "F",
        },
      ],
      onFilter: (value, record) => record.Gender.indexOf(value) === 0,
    },
    {
      title: "Имэйл хаяг",
      dataIndex: "Email",
      key: "Email",
      width: 95,
      filterSearch: true,
      filters: [
        {
          text: "Ажлийн имэйлтэй",
          value: "@ultimate.mn",
        },
        {
          text: "Хувийн имэйлтэй",
          value: ".com",
        },
      ],
      onFilter: (value, record) => record.Email.includes(value),
    },
    {
      title: "Утасны дугаар",
      dataIndex: "PhoneNumber",
      key: "PhoneNumber",
      width: 105,
    },
    {
      title: "Ажлын утас",
      dataIndex: "WorkPhone",
      key: "WorkPhone",
      width: 105,
      render: (text) => <p>{text ? text : "Байхгүй"}</p>,
    },
    {
      title: "Гэрийн хаяг",
      dataIndex: "Address",
      key: "Address",
      width: 140,
      render: (text) => <p style={{ fontSize: 12 }}>{text}</p>,
      responsive: ["xl"],
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
      render: (text) => <p>{text === "A" ? "Идэвхтэй" : "Идэвхгүй"}</p>,
      filterSearch: true,
      filters: [
        {
          text: "Идэвхтэй",
          value: "A",
        },
        {
          text: "Идэвхгүй",
          value: "I",
        },
      ],
      onFilter: (value, record) => record.Status.indexOf(value) === 0,
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
        pagination={{ position: ["bottomCenter"] }}
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
