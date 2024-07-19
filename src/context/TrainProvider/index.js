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
  handleSelectedCategory: () => {},
  selectedCategory: 1,
  trainingTypes: [],
  learningDatas: [],
  loading: false,
  isFailed: false,
  trainForm: {},
});

const TrainProvider = ({ children }) => {
  const userToken = sessionStorage.getItem("userToken");
  const [learningDatas, setLearningDatas] = useState();
  const [trainingTypes, setTrainingTypes] = useState();
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
  const handleSelectedCategory = (id) => {
    setSelectedCategory(id);
  };

  const getLearningData = async (id) => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const { data } = await myAxios.get(`/api/training?CategoryID=${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      console.log("LEARNING DATA", data);
      setLearningDatas(data.result);
    } catch (error) {
      console.log("ERROR IN GET TRAININGS", error);
      if (!error.response) {
        alert("Уучлаарай, сүлжээ унасан байна", "error");
      } else {
        // alert(error.response.data.error.message, "error");
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
          Authorization: `Bearer ${userToken}`,
        },
      });
      setTrainingTypes(data.result);
      setSelectedCategory(data?.result[0]?.ID);
      console.log(data);
    } catch (error) {
      if (!error.response) {
        alert("Уучлаарай, сүлжээ унасан байна", "error");
      } else {
        alert(error.response.data.error.message, "error");
      }
    }
  };

  const addTrainingType = async (Name) => {
    try {
      const { data } = await myAxios.post(
        "/api/training/category",
        {
          Name,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      alert("Шинэ төрөл амжилттай нэмэгдлээ", "success");
      await getTrainingType();
    } catch (error) {
      if (!error.response) {
        alert("Уучлаарай, сүлжээ унасан байна", "error");
      } else {
        alert(error.response.data.error.message, "error");
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
      const data = await myAxios.post("/api/training", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userToken}`,
        },
      });
      alert("Амжилттай хадгаллаа", "success");
      getLearningData(selectedCategory);
    } catch (error) {
      console.log("error in adding data", error);
      if (!error.response) {
        alert("Уучлаарай, сүлжээ унасан байна", "error");
      } else {
        alert(error.response.data.error.message, "error");
      }
    }
  };

  return (
    <trainContext.Provider
      value={{
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
