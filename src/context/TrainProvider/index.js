import { alert } from "../../lib/actions/alert.actions";
import myAxios from "../../lib/axios";

import { createContext, useContext, useState } from "react";

const trainContext = createContext({
  getLearningData: () => {},
  learningDatas: [],
  loading: false,
  isFailed: false,
});

const TrainProvider = ({ children }) => {
  const [learningDatas, setLearningDatas] = useState();
  const [loading, setIsLoading] = useState(true);
  const [isFailed, setIsFailed] = useState(false);

  const getLearningData = async () => {
    const userToken = sessionStorage.getItem("userToken");
    setIsLoading(true);
    setIsFailed(false);
    try {
      const { data } = await myAxios.get("/api/training", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
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

  const addLearningData = async () => {
    try {
    } catch (error) {
      if (!error.response) {
        alert("Уучлаарай, сүлжээ унасан байна", "error");
      } else {
        alert(error.response.data.error.message, "error");
      }
    }
  };

  return (
    <trainContext.Provider
      value={{ loading, learningDatas, getLearningData, isFailed }}
    >
      {children}
    </trainContext.Provider>
  );
};
export default TrainProvider;

export const useTraining = () => {
  return useContext(trainContext);
};
