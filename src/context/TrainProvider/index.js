import { alert } from "../../lib/actions/alert.actions";
import myAxios from "../../lib/axios";

import { createContext, useContext, useState } from "react";

const trainContext = createContext({
  getLearningData: () => {},
  getTrainingType: () => {},
  handleTrainForm: () => {},
  addLearningData: () => {},
  addTrainingType: () => {},
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
  const [loading, setIsLoading] = useState(true);
  const [isFailed, setIsFailed] = useState(false);
  const [trainForm, setTrainForm] = useState({
    Name: "",
    Type: "",
    IsFile: "N",
    FileDescr: "",
  });
  const handleTrainForm = (name, value) => {
    setTrainForm((prev) => ({ ...prev, [name]: value }));
  };

  const getLearningData = async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const { data } = await myAxios.get("/api/training", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      console.log("LEARNING DATA", data);
      setLearningDatas(data.result);
    } catch (error) {
      if (!error.response) {
        alert("Уучлаарай, сүлжээ унасан байна", "error");
      } else {
        alert(error.response.data.error.message, "error");
      }
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  };
  const getTrainingType = async () => {
    try {
      const { data } = await myAxios.get("/api/trainingType", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setTrainingTypes(data.result);
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
        "/api/trainingType",
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
    formData.append("Type", trainForm.Type);
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
      console.log("ADDED LEARNING DATA", data);
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
        getLearningData,
        isFailed,
        handleTrainForm,
        getTrainingType,
        addLearningData,
        addTrainingType,
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
