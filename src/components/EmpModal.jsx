import { Button, DatePicker, Input, Modal, Select } from "antd";
import React from "react";
import { useEmployee } from "../context/EmployeeProvider";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";

const EmpModal = ({ open, isEdit, handleClose }) => {
  const { handleEmpForm, addEmployee, empFormEdit, editEmployee } =
    useEmployee();
  const handleInput = (e) => {
    handleEmpForm(e.target.name, e.target.value);
  };
  const handleBd = (_, datestring) => {
    handleEmpForm("BirthDate", datestring.replace("-", ".").replace("-", "."));
  };
  const handleHd = (_, datestring) => {
    handleEmpForm("HireDate", datestring.replace("-", ".").replace("-", "."));
  };
  const handleSelect = (_, opt) => {
    handleEmpForm(opt.name, opt.value);
  };
  return (
    <Modal
      footer={null}
      closable={false}
      open={open}
      title={isEdit ? "Мэдээлэл засах" : "Ажилтан нэмэх"}
    >
      <div className="emp-modal-container">
        <p>Регистерийн дугаар</p>
        <Input
          value={empFormEdit.RegisterNumber}
          disabled={isEdit}
          name="RegisterNumber"
          placeholder="Регистерийн дугаар"
          onChange={handleInput}
        />

        <div className="emp-modal-flex">
          <div>
            <p>Овог</p>
            <Input
              value={empFormEdit.LastName}
              name="LastName"
              placeholder="Овог"
              onChange={handleInput}
            />
          </div>
          <div>
            <p>Нэр</p>
            <Input
              value={empFormEdit.FirstName}
              name="FirstName"
              placeholder="Нэр"
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="emp-modal-flex">
          <div>
            <p>Имэйл хаяг</p>
            <Input
              value={empFormEdit.Email}
              name="Email"
              placeholder="Имэйл хаяг"
              onChange={handleInput}
            />
          </div>
          <div>
            <p>Утасны дугаар</p>
            <Input
              value={empFormEdit.PhoneNumber}
              name="PhoneNumber"
              placeholder="Утасны дугаар"
              onChange={handleInput}
            />
          </div>
        </div>
        <p>Компани</p>
        <Input
          value={empFormEdit.CpnyID}
          name="CpnyID"
          placeholder="Компани"
          onChange={handleInput}
        />
        <Input
          value={empFormEdit.Department}
          name="Department"
          placeholder="Хэлтэс"
          onChange={handleInput}
        />
        <Input
          value={empFormEdit.Position}
          name="Position"
          placeholder="Албан тушаал"
          onChange={handleInput}
        />
        {isEdit ? (
          <>
            <div className="emp-modal-flex">
              <DatePicker
                value={dayjs(empFormEdit.BirthDate)}
                style={{ width: "100%" }}
                name="BirthDate"
                placeholder="Төрсөн өдөр"
                onChange={handleBd}
              />
              <DatePicker
                value={dayjs(empFormEdit.HireDate)}
                style={{ width: "100%" }}
                name="HireDate"
                placeholder="Ажилд орсон огноо"
                onChange={handleHd}
              />
            </div>
            <div className="emp-modal-flex">
              <Select
                value={empFormEdit.Gender}
                style={{ width: "100%" }}
                placeholder="Хүйс"
                onChange={handleSelect}
                options={[
                  { value: "M", label: "Эрэгтэй", name: "Gender" },
                  { value: "F", label: "Эмэгтэй", name: "Gender" },
                ]}
              />
              <Select
                value={empFormEdit.Role}
                style={{ width: "100%" }}
                name="Role"
                placeholder="Эрх"
                onChange={handleSelect}
                options={[
                  { value: "admin", label: "Админ", name: "Role" },
                  { value: "hr", label: "Хүний нөөц", name: "Role" },
                  { value: "user", label: "Хэрэглэгч", name: "Role" },
                ]}
              />
            </div>
          </>
        ) : (
          <>
            <div className="emp-modal-flex">
              <DatePicker
                style={{ width: "100%" }}
                name="BirthDate"
                placeholder="Төрсөн өдөр"
                onChange={handleBd}
              />
              <DatePicker
                style={{ width: "100%" }}
                name="HireDate"
                placeholder="Ажилд орсон огноо"
                onChange={handleHd}
              />
            </div>
            <div className="emp-modal-flex">
              <Select
                style={{ width: "100%" }}
                placeholder="Хүйс"
                onChange={handleSelect}
                options={[
                  { value: "M", label: "Эрэгтэй", name: "Gender" },
                  { value: "F", label: "Эмэгтэй", name: "Gender" },
                ]}
              />
              <Select
                style={{ width: "100%" }}
                name="Role"
                placeholder="Эрх"
                onChange={handleSelect}
                options={[
                  { value: "admin", label: "Админ", name: "Role" },
                  { value: "hr", label: "Хүний нөөц", name: "Role" },
                  { value: "user", label: "Хэрэглэгч", name: "Role" },
                ]}
              />
            </div>
          </>
        )}

        <TextArea
          value={empFormEdit.Address}
          name="Address"
          placeholder="Хаяг"
          onChange={handleInput}
        />
        <div className="emp-modal-buttons">
          <Button onClick={handleClose}>Болих</Button>
          {isEdit ? (
            <Button
              onClick={() => {
                editEmployee(empFormEdit.ID);
                handleClose();
              }}
              type="primary"
            >
              Өөрчлөлт хадгалах
            </Button>
          ) : (
            <Button
              onClick={() => {
                addEmployee(empFormEdit, true);
                handleClose();
              }}
              type="primary"
            >
              Нэмэх
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default EmpModal;
