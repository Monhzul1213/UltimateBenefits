import axios from "axios";
import { alert } from "./alert.actions";

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

export const checkRegister = async (register) => {
  try {
    const res = await axios.post(
      `${apiUrl}/api/users/registerNumberCheck`,
      {
        UserID: register,
      },
      { headers: { ultimatekey: apiKey } }
    );
    return res.data.success;
  } catch (error) {
    if (!error.response) {
      alert("Уучлаарай, сүлжээ унасан байна", "error");
    } else {
      alert(error.response.data.error.message, "error");
    }
    console.log("ERROR in checkRegister", error);
  }
};

export const login = async (register, pin) => {
  try {
    const res = await axios.post(
      `${apiUrl}/api/users/login`,
      {
        UserID: register,
        Password: pin,
      },
      { headers: { ultimatekey: apiKey } }
    );
    localStorage.setItem("userToken", res.data.result);
    alert("Амжилттай нэвтэрлээ", "success");
    return res.data.success;
  } catch (error) {
    alert(error.response.data.error.message, "error");
  }
};
