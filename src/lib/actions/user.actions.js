import axios from "axios";
import { alert } from "./alert.actions";
export const checkRegister = async (register) => {
  try {
    const res = await axios.post(
      `http://192.168.1.34:8082/api/users/registerNumberCheck`,
      {
        UserID: register,
      },
      { headers: { ultimatekey: "316c7b2e-058a-40da-b180-e02b5f6cf3c0" } }
    );
    return res.data.success;
  } catch (error) {
    alert(error.response.data.error.message, "error");
  }
};

export const login = async (register, pin) => {
  try {
    const res = await axios.post(
      `http://192.168.1.34:8082/api/users/login`,
      {
        UserID: register,
        Password: pin,
      },
      { headers: { ultimatekey: "316c7b2e-058a-40da-b180-e02b5f6cf3c0" } }
    );
    alert("Амжилттай нэвтэрлээ", "success ");
    console.log("Login working", res);
  } catch (error) {
    alert(error.response.data.error.message, "error");
  }
};
