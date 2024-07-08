import { createContext, useContext, useEffect, useState } from "react";
import myAxios from "../../lib/axios";
import { useAuth } from "../AuthProvider";

export const employeeContext = createContext({
  setEmpForm: () => {},
  empCount: [{}],
  empForm: [{}],
  columns: [{}],
  empLoading: false,
  empFailed: false,
  addEmployee: () => {},
  getEmployees: () => {},
});
const EmployeeProvider = ({ children }) => {
  const { user } = useAuth();
  const [empCount, setEmpCount] = useState();
  const [empLoading, setEmpLoading] = useState(false);
  const [empFailed, setEmpFailed] = useState(false);
  const [empForm, setEmpForm] = useState();
  const [columns, setColumns] = useState();

  const getEmployees = async () => {
    setEmpLoading(true);
    try {
      const { data } = await myAxios.get("/api/users", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      });
      console.log(data.user);
      setEmpCount(data.user);
      setEmpForm(data.result);
      setEmpFailed(false);
    } catch (error) {
      setEmpFailed(true);
    } finally {
      setEmpLoading(false);
    }
  };
  const addEmployee = async () => {
    console.log("ADDING EMPLOYEE", empForm);
    try {
      const { data } = await myAxios.post("/api/users/register", empForm, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      });
      console.log("Employees added", data);
    } catch (error) {
      console.log("Error in adding employee", error);
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
        setEmpForm,
        addEmployee,
        empCount,
        empForm,
        columns,
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
