import { createContext, useContext, useState } from "react";
import myAxios from "../../lib/axios";
import { alert } from "../../lib/actions/alert.actions";
import { useAuth } from "../AuthProvider";

const CareContext = createContext({
  getCares: () => {},
  careCategory: [],
  careLoading: false,
  careFailed: false,
  careCategoryForm: {},
  handleCategoryForm: () => {},
  createCareCategory: () => {},
  editCareCategory: () => {},
  deleteCareCategory: () => {},
  deleteCareDetail: () => {},
  getCareDetail: () => {},
  createCareDetail: () => {},
  clearForm: () => {},
});

const CareProvider = ({ children }) => {
  const { user } = useAuth();

  const [careCategory, setCareCategory] = useState();
  const [careLoading, setCareLoading] = useState(false);
  const [careFailed, setCareFailed] = useState(false);

  const [careCategoryForm, setCategoryForm] = useState({
    Name: "",
    Descr: "",
    Image: "",
    AvailableMonth: "",
  });
  const clearForm = () => {
    setCategoryForm({
      Name: "",
      Descr: "",
      Image: "",
      AvailableMonth: "",
    });
  };
  const handleCategoryForm = (name, value) => {
    setCategoryForm((prev) => ({ ...prev, [name]: value }));
  };

  const getCares = async () => {
    setCareFailed(false);
    setCareLoading(true);
    const userToken = sessionStorage.getItem("userToken");
    try {
      const { data } = await myAxios.get(`/api/socialProvision/category`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const array = data.result;
      let result = [];
      for (let i = 0; i < array.length; i += 2) {
        let chunk = array.slice(i, i + 2);
        result.push(chunk);
      }
      setCareCategory(result);
    } catch (error) {
      if (!error.response) {
        alert("Уучлаарай, сүлжээ унасан байна", "error");
      } else {
        alert(error.response.data.error.message, "error");
      }
      setCareFailed(true);
    } finally {
      setCareLoading(false);
    }
  };
  const createCareCategory = async () => {
    const formData = new FormData();
    formData.append("Name", "Ner");
    formData.append("Descr", careCategoryForm.Descr);
    formData.append("Image", careCategoryForm.Image);
    formData.append("AvailableMonth", careCategoryForm.AvailableMonth);
    try {
      await myAxios.post("/api/socialProvision/category", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      });
      alert("Амжилттай хадгаллаа", "success");
      getCares();
    } catch (error) {
      if (!error.response) {
        alert("Уучлаарай, сүлжээ унасан байна", "error");
      } else {
        alert(error.response.data.error.message, "error");
      }
    }
  };
  const editCareCategory = async (id) => {
    try {
      const { data } = myAxios.put(`/api/socialProvision/category/${id}`);
    } catch (error) {
      if (!error.response) {
        alert("Уучлаарай, сүлжээ унасан байна", "error");
      } else {
        alert(error.response.data.error.message, "error");
      }
    }
  };
  const deleteCareCategory = async (id) => {
    try {
      const { data } = myAxios.delete(`/api/socialProvision/category/${id}`);
    } catch (error) {
      if (!error.response) {
        alert("Уучлаарай, сүлжээ унасан байна", "error");
      } else {
        alert(error.response.data.error.message, "error");
      }
    }
  };
  const getCareDetail = async (id) => {
    try {
      const { data } = myAxios.get(`/api/socialProvision/detail/${id}`);
    } catch (error) {
      if (!error.response) {
        alert("Уучлаарай, сүлжээ унасан байна", "error");
      } else {
        alert(error.response.data.error.message, "error");
      }
    }
  };
  const editCareDetail = async (id) => {
    try {
      myAxios.put(`/api/socialProvision/detail/${id}`);
    } catch (error) {
      if (!error.response) {
        alert("Уучлаарай, сүлжээ унасан байна", "error");
      } else {
        alert(error.response.data.error.message, "error");
      }
    }
  };
  const deleteCareDetail = async (id) => {
    try {
      myAxios.delete(`/api/socialProvision/detail/${id}`);
    } catch (error) {
      if (!error.response) {
        alert("Уучлаарай, сүлжээ унасан байна", "error");
      } else {
        alert(error.response.data.error.message, "error");
      }
    }
  };
  const createCareDetail = async () => {
    try {
      myAxios.get(`/api/socialProvision/detail`);
    } catch (error) {
      if (!error.response) {
        alert("Уучлаарай, сүлжээ унасан байна", "error");
      } else {
        alert(error.response.data.error.message, "error");
      }
    }
  };
  return (
    <CareContext.Provider
      value={{
        getCares,
        careLoading,
        careFailed,
        careCategory,
        careCategoryForm,
        handleCategoryForm,
        createCareCategory,
        editCareCategory,
        deleteCareCategory,
        createCareDetail,
        editCareDetail,
        deleteCareDetail,
        clearForm,
      }}
    >
      {children}
    </CareContext.Provider>
  );
};
export default CareProvider;

export const useCare = () => {
  return useContext(CareContext);
};
