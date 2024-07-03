import myAxios from "../axios";
export const getLearningData = async (UserID) => {
  const userToken = sessionStorage.getItem("userToken");
  try {
    const { data } = await myAxios.get("/api/learning/getLearning", {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    console.log("learning data", data);
    return data.result;
  } catch (error) {
    console.log("error in get learning data", error);
  }
};
