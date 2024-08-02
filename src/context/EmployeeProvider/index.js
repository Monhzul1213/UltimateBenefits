import { createContext, useContext, useEffect, useState } from "react";
import myAxios from "../../lib/axios";
import { useAuth } from "../AuthProvider";
import { alert } from "../../lib/actions/alert.actions";

export const employeeContext = createContext({
  setEmpForm: () => {},
  empCount: [{}],
  empForm: [{}],
  empLoading: false,
  empFailed: false,
  empFormEdit: {},
  employeeSearch: () => {},
  searchValue: "",
  addEmployee: () => {},
  getEmployees: () => {},
  handleEmpForm: () => {},
  setEmpFormEdit: () => {},
  editEmployee: () => {},
});
const EmployeeProvider = ({ children }) => {
  const { user } = useAuth();
  const [empCount, setEmpCount] = useState();
  const [empLoading, setEmpLoading] = useState(false);
  const [empFailed, setEmpFailed] = useState(false);
  const [empForm, setEmpForm] = useState();
  const [empFormEdit, setEmpFormEdit] = useState({
    LastName: "",
    FirstName: "",
    RegisterNumber: "",
    Gender: "",
    CpnyID: "",
    Department: "",
    Position: "",
    BirthDate: "",
    Email: "",
    PhoneNumber: "",
    WorkPhone: "",
    Address: "",
    HireDate: "",
    Role: "",
    Status: "",
  });

  const handleEmpForm = (name, value) => {
    setEmpFormEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //Search
  const [originEmpData, setOriginEmpData] = useState();
  const [searchValue, setSearchValue] = useState();
  const employeeSearch = (e) => {
    setSearchValue(e.target.value);
    const searchResults = originEmpData?.filter((data) => {
      const name = data.FirstName.toLowerCase();
      const searchV = e.target.value.toLowerCase();
      return name.includes(searchV);
    });
    setEmpForm(searchResults);
  };
  const getEmployees = async () => {
    setEmpLoading(true);
    try {
      const { data } = await myAxios.get("/api/users", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      });
      setEmpCount(data.user);
      setOriginEmpData(data.result);
      setEmpForm(data.result);
      setEmpFailed(false);
    } catch (error) {
      setEmpFailed(true);
    } finally {
      setEmpLoading(false);
    }
  };
  const addEmployee = async (employees, isOne) => {
    const empData = isOne ? [employees] : employees;
    try {
      await myAxios.post("/api/users/register", empData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      });
      alert("Ажилтан амжилттай нэмэгдлээ", "success");
      getEmployees();
      setEmpFormEdit();
    } catch (error) {
      if (!error.response) {
        alert("Уучлаарай, сүлжээ унасан байна", "error");
      } else {
        alert(error.response.data.error.message, "error");
      }
    }
  };
  const editEmployee = async (id) => {
    setEmpLoading(true);
    try {
      await myAxios.put(`/api/users/${id}`, empFormEdit, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      });
      alert("Амжилттай өөрчлөгдлөө", "success");
      getEmployees();
    } catch (error) {
      if (!error.response) {
        alert("Уучлаарай, сүлжээ унасан байна", "error");
      } else {
        alert(error.response.data.error.message, "error");
      }
    }
  };
  useEffect(() => {
    if (user) {
      getEmployees();
    }
  }, [user]);
  return (
    <employeeContext.Provider
      value={{
        editEmployee,
        getEmployees,
        setEmpForm,
        addEmployee,
        handleEmpForm,
        setEmpFormEdit,
        employeeSearch,
        searchValue,
        empCount,
        empForm,
        empFormEdit,
        empFailed,
        empLoading,
      }}
    >
      {children}
    </employeeContext.Provider>
  );
};

export default EmployeeProvider;
export const useEmployee = () => {
  return useContext(employeeContext);
};
