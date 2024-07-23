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
    <Modal centered footer={null} closable={false} open={open} width={700}>
      <div className="emp-modal-container">
        <div className="emp-modal-header">
          <h2>{isEdit ? "Мэдээлэл засах" : "Ажилтан нэмэх"}</h2>
        </div>
        <div className="emp-modal-flex">
          <div style={{ width: "100%" }}>
            <p style={{ fontSize: 15, fontWeight: 500 }}>Регистерийн дугаар</p>
            <Input
              size="large"
              value={empFormEdit.RegisterNumber}
              disabled={isEdit}
              name="RegisterNumber"
              placeholder="Регистерийн дугаар"
              onChange={handleInput}
            />
          </div>
          <div style={{ width: "100%" }}>
            <p style={{ fontSize: 15, fontWeight: 500 }}>Имэйл хаяг</p>
            <Input
              size="large"
              value={empFormEdit.Email}
              name="Email"
              placeholder="Имэйл хаяг"
              onChange={handleInput}
            />
          </div>
        </div>

        <div className="emp-modal-flex">
          <div style={{ width: "100%" }}>
            <p style={{ fontSize: 15, fontWeight: 500 }}>Овог</p>
            <Input
              size="large"
              value={empFormEdit.LastName}
              name="LastName"
              placeholder="Овог"
              onChange={handleInput}
            />
          </div>
          <div style={{ width: "100%" }}>
            <p style={{ fontSize: 15, fontWeight: 500 }}>Нэр</p>
            <Input
              size="large"
              value={empFormEdit.FirstName}
              name="FirstName"
              placeholder="Нэр"
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="emp-modal-flex">
          <div style={{ width: "100%" }}>
            <p style={{ fontSize: 15, fontWeight: 500 }}>Утасны дугаар</p>
            <Input
              size="large"
              value={empFormEdit.PhoneNumber}
              name="PhoneNumber"
              placeholder="Утасны дугаар"
              onChange={handleInput}
            />
          </div>
          <div style={{ width: "100%" }}>
            <p style={{ fontSize: 15, fontWeight: 500 }}>Ажлийн утас</p>
            <Input
              size="large"
              value={empFormEdit.WorkPhone}
              name="WorkPhone"
              placeholder="Ажлийн утас"
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="emp-modal-flex">
          <div style={{ width: "100%" }}>
            <p style={{ fontSize: 15, fontWeight: 500 }}>Компани</p>
            <Input
              size="large"
              value={empFormEdit.CpnyID}
              name="CpnyID"
              placeholder="Компани"
              onChange={handleInput}
            />
          </div>
          <div style={{ width: "100%" }}>
            <p style={{ fontSize: 15, fontWeight: 500 }}>Хэлтэс</p>
            <Input
              size="large"
              value={empFormEdit.Department}
              name="Department"
              placeholder="Захиргааны хэлтэс"
              onChange={handleInput}
            />
          </div>
        </div>
        {isEdit ? (
          <>
            <div className="emp-modal-flex">
              <div style={{ width: "100%" }}>
                <p style={{ fontSize: 15, fontWeight: 500 }}>Төрсөн өдөр</p>
                <DatePicker
                  size="large"
                  value={dayjs(empFormEdit.BirthDate)}
                  style={{ width: "100%" }}
                  name="BirthDate"
                  placeholder="2003-10-09"
                  onChange={handleBd}
                />
              </div>
              <div style={{ width: "100%" }}>
                <p style={{ fontSize: 15, fontWeight: 500 }}>
                  Ажилд орсон огноо
                </p>
                <DatePicker
                  size="large"
                  value={dayjs(empFormEdit.HireDate)}
                  style={{ width: "100%" }}
                  name="HireDate"
                  placeholder="2024-06-18"
                  onChange={handleHd}
                />
              </div>
            </div>
            <div className="emp-modal-flex">
              <div style={{ width: "100%" }}>
                <p style={{ fontSize: 15, fontWeight: 500 }}>Хүйс</p>
                <Select
                  size="large"
                  value={empFormEdit.Gender}
                  style={{ width: "100%" }}
                  placeholder="Хүйс"
                  onChange={handleSelect}
                  options={[
                    { value: "M", label: "Эрэгтэй", name: "Gender" },
                    { value: "F", label: "Эмэгтэй", name: "Gender" },
                  ]}
                />
              </div>
              <div style={{ width: "100%" }}>
                <p style={{ fontSize: 15, fontWeight: 500 }}>Эрх</p>
                <Select
                  size="large"
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
            </div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 500 }}>Төлөв</p>
              <Select
                size="large"
                value={empFormEdit.Status}
                style={{ width: "100%" }}
                name="Role"
                placeholder="Идэвхтэй"
                onChange={handleSelect}
                options={[
                  { value: "A", label: "Идэвхтэй", name: "Status" },
                  { value: "I", label: "Идэвхгүй", name: "Status" },
                ]}
              />
            </div>
          </>
        ) : (
          <>
            <div className="emp-modal-flex">
              <div style={{ width: "100%" }}>
                <p style={{ fontSize: 15, fontWeight: 500 }}>Төрсөн өдөр</p>
                <DatePicker
                  size="large"
                  style={{ width: "100%" }}
                  name="BirthDate"
                  placeholder="2024-10-09"
                  onChange={handleBd}
                />
              </div>
              <div style={{ width: "100%" }}>
                <p style={{ fontSize: 15, fontWeight: 500 }}>
                  Ажилд орсон огноо
                </p>
                <DatePicker
                  size="large"
                  style={{ width: "100%" }}
                  name="HireDate"
                  placeholder="2024-06-16"
                  onChange={handleHd}
                />
              </div>
            </div>

            <div className="emp-modal-flex">
              <div style={{ width: "100%" }}>
                <p style={{ fontSize: 15, fontWeight: 500 }}>Хүйс</p>
                <Select
                  size="large"
                  style={{ width: "100%" }}
                  placeholder="Эр"
                  onChange={handleSelect}
                  options={[
                    { value: "M", label: "Эрэгтэй", name: "Gender" },
                    { value: "F", label: "Эмэгтэй", name: "Gender" },
                  ]}
                />
              </div>
              <div style={{ width: "100%" }}>
                <p style={{ fontSize: 15, fontWeight: 500 }}>Эрх</p>
                <Select
                  size="large"
                  style={{ width: "100%" }}
                  name="Role"
                  placeholder="Хэрэглэгч"
                  onChange={handleSelect}
                  options={[
                    { value: "admin", label: "Админ", name: "Role" },
                    { value: "hr", label: "Хүний нөөц", name: "Role" },
                    { value: "user", label: "Хэрэглэгч", name: "Role" },
                  ]}
                />
              </div>
            </div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 500 }}>Төлөв</p>
              <Select
                size="large"
                style={{ width: "100%" }}
                name="Role"
                placeholder="Төлөв"
                onChange={handleSelect}
                options={[
                  { value: "A", label: "Идэвхтэй", name: "Status" },
                  { value: "I", label: "Идэвхгүй", name: "Status" },
                ]}
              />
            </div>
          </>
        )}

        <div>
          <p style={{ fontSize: 15, fontWeight: 500 }}>Хаяг</p>
          <TextArea
            size="large"
            value={empFormEdit.Address}
            name="Address"
            placeholder="Улаанбаатар хот, Монгол улс, Сүхбаатар дүүрэг Сөүлийн гудамж, Twin Tower-2, 11 давхар"
            onChange={handleInput}
          />
        </div>
        <div className="emp-modal-buttons">
          <Button size="large" onClick={handleClose}>
            Болих
          </Button>
          {isEdit ? (
            <Button
              size="large"
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
              size="large"
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
