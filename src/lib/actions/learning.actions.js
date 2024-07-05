import myAxios from "../axios";
export const getLearningData = async (UserID) => {
  const userToken = sessionStorage.getItem("userToken");
  try {
    const { data } = await myAxios.get("/api/learning/getLearning", {
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
