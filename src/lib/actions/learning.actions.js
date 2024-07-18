import myAxios from "../axios";
import { alert } from "./alert.actions";
export const getLearningData = async (UserID) => {
  const userToken = sessionStorage.getItem("userToken");
  try {
    const { data } = await myAxios.get("/api/training", {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return data.result;
  } catch (error) {
    if (!error.response) {
      alert("Уучлаарай, сүлжээ унасан байна", "error");
    } else {
      alert(error.response.data.error.message, "error");
    }
  }
};

export const addLearningData = async () => {
  try {
  } catch (error) {
    if (!error.response) {
      alert("Уучлаарай, сүлжээ унасан байна", "error");
    } else {
      alert(error.response.data.error.message, "error");
    }
  }
};
