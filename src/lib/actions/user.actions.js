import axios from "axios";
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
    console.log("ERROR IN CHECK REGISTER", error);
  }
};

export const login = async (register, pin) => {
  try {
    const res = await axios.post(
      `http://192.168.1.34:8082/api/users/login`,
      {
        UserId: register,
        Password: pin,
      },
      { headers: { ultimatekey: "316c7b2e-058a-40da-b180-e02b5f6cf3c0" } }
    );
    console.log("Login working", res);
  } catch (error) {
    console.log("ERROR IN LOGIN", error);
  }
};
