import myAxios from "../axios";
import { alert } from "./alert.actions";
export const getCares = async (userId) => {
  const userToken = sessionStorage.getItem("userToken");
  try {
    const { data } = await myAxios.get(`/api/care/getCares?UserID=${userId}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return data;
  } catch (error) {
    if (!error.response) {
      alert("Уучлаарай, сүлжээ унасан байна", "error");
    } else {
      alert(error.response.data.error.message, "error");
    }
    console.log("ERROR IN GET CARES", error);
  }
};
