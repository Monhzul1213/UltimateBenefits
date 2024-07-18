import myAxios from "../axios";
import { alert } from "./alert.actions";
export const getCares = async (userId) => {
  const userToken = sessionStorage.getItem("userToken");
  try {
    const { data } = await myAxios.get(
      `/api/socialProvision?UserID=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return data;
  } catch (error) {
    // console.log("ERROR IN GET CARES", error);
    if (!error.response) {
      alert("Уучлаарай, сүлжээ унасан байна", "error");
    } else {
      alert(error.response.data.error.message, "error");
    }
  }
};
