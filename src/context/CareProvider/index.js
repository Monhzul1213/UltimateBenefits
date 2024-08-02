import { createContext, useContext, useState } from "react";
import myAxios from "../../lib/axios";
import { alert } from "../../lib/actions/alert.actions";
import { useAuth } from "../AuthProvider";

const CareContext = createContext({
  getCares: () => {},
  careDetail: [],
  careCategory: [],
  careLoading: false,
  careFailed: false,
  careCategoryForm: {},
  editImg: "",
  careDetailForm: "",
  selectedCategory: 0,
  setSelectedCategory: () => {},
  handleCategoryForm: () => {},
  handleDetailForm: () => {},
  createCareCategory: () => {},
  editCareCategory: () => {},
  deleteCareCategory: () => {},
  deleteCareDetail: () => {},
  getCareDetail: () => {},
  createCareDetail: () => {},
  clearForm: () => {},
  clearDetailForm: () => {},
  categoryEdit: false,
  setCategoryEdit: () => {},
  setCategoryForm: () => {},
  setEditImg: () => {},
  detailEdit: () => {},
  setDetailEdit: () => {},
  setCareDetailForm: () => {},
  editCareDetail: () => {},
});

const CareProvider = ({ children }) => {
  const { user } = useAuth();

  const [careCategory, setCareCategory] = useState();
  const [careLoading, setCareLoading] = useState(false);
  const [careFailed, setCareFailed] = useState(false);

  const [categoryEdit, setCategoryEdit] = useState(false);
  const [detailEdit, setDetailEdit] = useState(false);
  const [editImg, setEditImg] = useState();

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
    setCategoryEdit(false);
    setEditImg("");
  };
  const handleCategoryForm = (name, value) => {
    setCategoryForm((prev) => ({ ...prev, [name]: value }));
  };

  //Detail section
  const [careDetailForm, setCareDetailForm] = useState({
    Name: "",
    Text: "",
  });
  const [selectedCategory, setSelectedCategory] = useState();
  const handleDetailForm = (name, value) => {
    setCareDetailForm((prev) => ({ ...prev, [name]: value }));
  };
  const clearDetailForm = () => {
    setCareDetailForm({
      Name: "",
      Text: "",
    });
    setSelectedCategory(null);
    setDetailEdit(false);
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
    formData.append("Name", careCategoryForm.Name);
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
    const formData = new FormData();
    console.log(careCategoryForm);
    formData.append("Name", careCategoryForm.Name);
    formData.append("Descr", careCategoryForm.Descr);
    formData.append("Image", careCategoryForm.Image);
    formData.append("AvailableMonth", careCategoryForm.AvailableMonth);
    try {
      await myAxios.put(`/api/socialProvision/category/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      });
      getCares();
    } catch (error) {
      console.log("ERROR IN EDIT", error);
      if (!error.response) {
        alert("Уучлаарай, сүлжээ унасан байна", "error");
      } else {
        alert(error.response.data.error.message, "error");
      }
    }
  };
  const deleteCareCategory = async (id) => {
    try {
      await myAxios.delete(`/api/socialProvision/category/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      });
      alert("Амжилттай устгагдлаа", "success");
      getCares();
    } catch (error) {
      if (!error.response) {
        alert("Уучлаарай, сүлжээ унасан байна", "error");
      } else {
        alert(error.response.data.error.message, "error");
      }
    }
  };
  const [careDetail, setCareDetail] = useState();
  const getCareDetail = async (id) => {
    try {
      const { data } = await myAxios.get(
        `/api/socialProvision/category/detail/${id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
          },
        }
      );
      console.log(data.result);
      setCareDetail(data.result);
    } catch (error) {
      if (!error.response) {
        alert("Уучлаарай, сүлжээ унасан байна", "error");
      } else {
        // alert(error.response.data.error.message, "error");
      }
    }
  };
  const editCareDetail = async (id) => {
    try {
      const { data } = await myAxios.put(
        `/api/socialProvision/category/detail/${id}`,
        careDetailForm,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
          },
        }
      );
      console.log("EDIT", data);
      alert("Амжилттай засагдлаа", "success");
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
      await myAxios.delete(`/api/socialProvision/category/detail/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      });
      alert("Амжилттай устгагдлаа", "success");
    } catch (error) {
      if (!error.response) {
        alert("Уучлаарай, сүлжээ унасан байна", "error");
      } else {
        alert(error.response.data.error.message, "error");
      }
    }
  };
  const createCareDetail = async () => {
    console.log("CREATING DETAIL", selectedCategory, careDetailForm);
    try {
      await myAxios.post(
        `/api/socialProvision/category/detail`,
        {
          Name: careDetailForm.Name,
          Text: careDetailForm.Text,
          CategoryID: parseInt(selectedCategory),
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
          },
        }
      );
      alert("Амжилттай нэмэгдлээ", "success");
    } catch (error) {
      console.log("ERROR IN CREATE DETAIL", error);
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
        categoryEdit,
        editImg,
        selectedCategory,
        getCareDetail,
        setSelectedCategory,
        setCategoryEdit,
        setCategoryForm,
        setEditImg,
        handleCategoryForm,
        handleDetailForm,
        createCareCategory,
        editCareCategory,
        deleteCareCategory,
        createCareDetail,
        editCareDetail,
        deleteCareDetail,
        clearForm,
        clearDetailForm,
        careDetailForm,
        careDetail,
        detailEdit,
        setDetailEdit,
        setCareDetailForm,
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
