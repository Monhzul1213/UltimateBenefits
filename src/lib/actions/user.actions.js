import { alert } from "./alert.actions";
import myAxios from "../axios";

export const checkRegister = async (register) => {
  try {
    const res = await myAxios.post("/api/users/registerNumberCheck", {
      UserID: register,
    });
    return res.data.success;
  } catch (error) {
    if (!error.response) {
      alert("Уучлаарай, сүлжээ унасан байна", "error");
    } else {
      alert(error.response.data.error.message, "error");
    }
  }
};

export const login = async (register, pin) => {
  try {
    const res = await myAxios.post("/api/users/login", {
      UserID: register,
      Password: pin,
    });
    sessionStorage.setItem("userToken", res.data.result);
    sessionStorage.setItem("userProfile", res.data.Image);
    alert("Амжилттай нэвтэрлээ", "success");
    return res.data.success;
  } catch (error) {
    if (!error.response) {
      alert("Уучлаарай, сүлжээ унасан байна", "error");
    } else {
      alert(error.response.data.error.message, "error");
    }
  }
};
