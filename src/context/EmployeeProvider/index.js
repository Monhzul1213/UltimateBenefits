import { createContext, useContext, useState } from "react";
import myAxios from "../../lib/axios";

export const employeeContext = createContext({
  handleForm: () => {},
});
const EmployeeProvider = ({ children }) => {
  const [empLoading, setEmpLoading] = useState(false);
  const [empFailed, setEmpFailed] = useState(false);
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
  const handleForm = (e) => {
    const { name, value } = e.target;
    setEmpForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const getEmployees = async () => {
    setEmpLoading(true);
    try {
    } catch (error) {
    } finally {
      setEmpLoading(false);
    }
  };

  const addEmployee = async () => {
    try {
      const { data } = await myAxios.post("/api/users/register", empForm);
    } catch (error) {}
  };
  return (
    <employeeContext.Provider
      value={{
        handleForm,
        addEmployee,
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
