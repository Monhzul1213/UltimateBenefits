import { downloadFile } from "../../assets";
import { alert } from "../../lib/actions/alert.actions";
import myAxios from "../../lib/axios";

import { createContext, useContext, useState } from "react";

const trainContext = createContext({
  getLearningData: () => {},
  getTrainingType: () => {},
  handleTrainForm: () => {},
  addLearningData: () => {},
  addTrainingType: () => {},
  clearTrainForm: () => {},
  editTrainForm: () => {},
  handleSelectedCategory: () => {},
  setSelectedType: () => {},
  deleteLearningData: () => {},
  updateLearningData: () => {},
  selectedType: "",
  selectedCategory: 1,
  trainingTypes: [],
  learningDatas: [],
  loading: false,
  isFailed: false,
  trainForm: {},
  downloadFile: () => {},
});

const TrainProvider = ({ children }) => {
  const [learningDatas, setLearningDatas] = useState();
  const [trainingTypes, setTrainingTypes] = useState();
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [loading, setIsLoading] = useState(true);
  const [isFailed, setIsFailed] = useState(false);
  const [trainForm, setTrainForm] = useState({
    Name: "",
    CategoryID: "",
    IsFile: "N",
    FileDescr: "",
  });
  const handleTrainForm = (name, value) => {
    setTrainForm((prev) => ({ ...prev, [name]: value }));
  };
  const clearTrainForm = () => {
    setTrainForm({
      Name: "",
      CategoryID: "",
      IsFile: "N",
      FileDescr: "",
    });
  };
  const editTrainForm = (value) => {
    setTrainForm(value);
  };
  const handleSelectedCategory = (id) => {
    setSelectedCategory(id);
  };

  const getLearningData = async (id) => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const { data } = await myAxios.get(`/api/training?CategoryID=${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      });
      console.log("LEARNING DATA", data);
      setLearningDatas(data.result);
    } catch (error) {
      console.log("ERROR IN GET TRAININGS", error);
      if (!error.response) {
        alert("Уучлаарай, сүлжээ унасан байна", "error");
      } else {
        alert("Алдаа гарлаа", "error");
      }
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  };
  const getTrainingType = async () => {
    try {
      const { data } = await myAxios.get("/api/training/category", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      });
      setTrainingTypes(data.result);
      setSelectedCategory(data?.result[0]?.ID);
      console.log(data);
    } catch (error) {
      console.log("ERROR IN GET TYPES", error);
      if (!error.response) {
        alert("Уучлаарай, сүлжээ унасан байна", "error");
      } else {
        alert("Алдаа гарлаа", "error");
      }
    }
  };

  const addTrainingType = async (Name) => {
    try {
      await myAxios.post(
        "/api/training/category",
        {
          Name,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
          },
        }
      );
      alert("Шинэ төрөл амжилттай нэмэгдлээ", "success");
      await getTrainingType();
    } catch (error) {
      if (!error.response) {
        alert("Уучлаарай, сүлжээ унасан байна", "error");
      } else {
        alert("Алдаа гарлаа", "error");
      }
    }
  };

  const addLearningData = async () => {
    const formData = new FormData();
    formData.append("Name", trainForm.Name);
    formData.append("CategoryID", trainForm.CategoryID);
    formData.append("IsFile", trainForm.IsFile);
    formData.append("FileDesc", trainForm.FileDescr);
    try {
      console.log("Addid train data", trainForm);
      await myAxios.post("/api/training", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      });
      alert("Амжилттай хадгаллаа", "success");
      getLearningData(selectedCategory);
    } catch (error) {
      console.log("error in adding data", error);
      if (!error.response) {
        alert("Уучлаарай, сүлжээ унасан байна", "error");
      } else {
        alert("Алдаа гарлаа", "error");
      }
    }
  };
  const deleteLearningData = async (id) => {
    console.log("DELETE data", id);
    try {
      await myAxios.delete(`/api/training/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      });
      alert("Амжилттай устгагдлаа", "success");
      getLearningData(1);
    } catch (error) {
      console.log("error in delte data", error);
      if (!error.response) {
        alert("Уучлаарай, сүлжээ унасан байна", "error");
      } else {
        alert("Алдаа гарлаа", "error");
      }
    }
  };
  const updateLearningData = async (id) => {
    const formData = new FormData();
    formData.append("Name", trainForm.Name);
    formData.append("CategoryID", trainForm.CategoryID);
    formData.append("IsFile", trainForm.IsFile);
    formData.append("FileDesc", trainForm.FileDescr);
    try {
      console.log("edit data", formData);
      await myAxios.put(`/api/training/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      });
      alert("Амжилттай засагдлаа", "success");
    } catch (error) {
      console.log("error in update data", error);
      if (!error.response) {
        alert("Уучлаарай, сүлжээ унасан байна", "error");
      } else {
        alert("Алдаа гарлаа", "error");
      }
    }
  };

  const downloadFile = async (filePath) => {
    try {
      const { data } = await myAxios.get(
        `/api/file/download?filePath=${filePath}`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
          },
        }
      );
      const url = window.URL.createObjectURL(new Blob([data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "1.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {}
  };
  return (
    <trainContext.Provider
      value={{
        downloadFile,
        loading,
        learningDatas,
        trainForm,
        trainingTypes,
        selectedCategory,
        getLearningData,
        isFailed,
        handleTrainForm,
        getTrainingType,
        addLearningData,
        addTrainingType,
        clearTrainForm,
        handleSelectedCategory,
        editTrainForm,
        deleteLearningData,
        selectedType,
        setSelectedType,
        updateLearningData,
      }}
    >
      {children}
    </trainContext.Provider>
  );
};
export default TrainProvider;

export const useTraining = () => {
  return useContext(trainContext);
};
