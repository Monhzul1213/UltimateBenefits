import { CustomHeader, Loader } from "../../components";
import * as XLSX from "xlsx";
import { useEmployee } from "../../context/EmployeeProvider";
import { Button, Dropdown } from "antd";
import { IoIosAdd } from "react-icons/io";
import "../../css/employees.css";
import { IoReload } from "react-icons/io5";
import { useRef, useState } from "react";
import EmpTable from "../../components/EmpTable";
import EmpCountCard from "../../components/EmpCountCard";
import EmpModal from "../../components/EmpModal";

export const Employees = () => {
  const [fileName, setFileName] = useState();
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setIsEdit(false);
    setEmpFormEdit({
      LastName: "",
      FirstName: "",
      RegisterID: "",
      Gender: "",
      CpnyID: "",
      Department: "",
      Position: "",
      BirthDate: "",
      Email: "",
      PhoneNumber: "",
      Address: "",
      HireDate: "",
      Role: "",
    });
  };

  const inputRef = useRef();
  const {
    addEmployee,
    setEmpForm,
    empForm,
    empCount,
    empFailed,
    empLoading,
    getEmployees,
    setEmpFormEdit,
  } = useEmployee();
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        const sheetHeaders = parsedData[1];
        const sheetData = parsedData.slice(1);
        setEmpForm(formatData(sheetData, sheetHeaders));
      };
    }
  };
  const formatData = (data, headers) => {
    const dat1 = data.map((row) => {
      const rowData = {};
      headers.forEach((header, index) => {
        rowData[header] = row[index];
      });
      return rowData;
    });
    dat1.shift();
    return dat1;
  };

  const items = [
    {
      key: "1",
      label: (
        <div
          onClick={() => {
            inputRef.current.click();
          }}
        >
          Excel-ээр нэмэх
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          onClick={() => {
            setOpen(true);
          }}
        >
          Нэмэх
        </div>
      ),
    },
  ];

  return (
    <>
      <CustomHeader title="Ажилтнуудын мэдээлэл" />
      {empLoading ? (
        <Loader />
      ) : empFailed ? (
        <div className="employee-error">
          <p>Алдаа гарлаа</p>
          <Button onClick={getEmployees} icon={<IoReload />}>
            Дахин оролдох
          </Button>
        </div>
      ) : (
        <div className="employee-container">
          <div className="employee-add-section">
            <Dropdown menu={{ items }}>
              <Button
                size="large"
                style={{ fontWeight: 600 }}
                type="primary"
                icon={<IoIosAdd size={28} />}
              >
                Ажилтан нэмэх
              </Button>
            </Dropdown>
            {fileName && (
              <div className="employee-add-section">
                <Button
                  icon={<IoIosAdd size={28} />}
                  type="primary"
                  size="large"
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    width: "195px",
                  }}
                  onClick={() => {
                    addEmployee(empForm, false);
                  }}
                >
                  {fileName}
                </Button>
              </div>
            )}

            <input
              style={{ display: "none" }}
              type="file"
              ref={inputRef}
              onChange={handleFileUpload}
            />
          </div>
          <div className="employee-count-card-container">
            <EmpCountCard
              title="Нийт ажилтан"
              count={empCount?.userTotalCount}
            />
            <EmpCountCard
              title="Идэвхтэй ажилтан"
              count={empCount?.activeUserCount}
            />
            <EmpCountCard
              title="Идэвхгүй ажилтан"
              count={empCount?.inactiveUserCount}
            />
            <EmpCountCard title="Эрэгтэй ажилтан" count={empCount?.maleCount} />
            <EmpCountCard
              title="Эмэгтэй ажилтан"
              count={empCount?.femaleCount}
            />
          </div>
          <div className="employee-table-container">
            <EmpTable
              empForm={empForm}
              setOpen={setOpen}
              setIsEdit={setIsEdit}
            />
          </div>
        </div>
      )}

      <EmpModal open={open} isEdit={isEdit} handleClose={handleClose} />
    </>
  );
};
