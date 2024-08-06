import { createContext, useContext, useEffect, useState } from "react";
import { checkRegister, login } from "../../lib/actions/user.actions";
import { alert } from "../../lib/actions/alert.actions";
import { jwtDecode } from "jwt-decode";
import myAxios from "../../lib/axios";

export const authContext = createContext({
  handleCheckRegister: () => {},
  handleLogin: () => {},
  logout: () => {},
  changeUserPhoto: () => {},
  loading: false,
  user: null,
  isAuth: false,
  open: false,
  openDrawer: false,
  userImage: "",
  setOpenDrawer: () => {},
  setOpen: () => {},
  checkOldPassword: () => {},
  changePassword: () => {},
  resetPassword: () => {},
});
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [userImage, setImage] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleCheckRegister = async (registerLetters, registerNums) => {
    const register = registerLetters.join("") + registerNums;
    setLoading(true);
    const isSuccess = await checkRegister(register);
    isSuccess && setOpen(true);
    setLoading(false);
  };

  const handleLogin = async (register, pin) => {
    if (pin.length === 4) {
      setLoading(true);
      const isLogged = await login(register, pin);
      isLogged && checkIsLogged();
      setOpen(false);
      setLoading(false);
    } else {
      alert("Нууц үг дутуу байна", "error");
    }
  };

  const checkIsLogged = () => {
    const token = sessionStorage.getItem("userToken");
    const image = sessionStorage.getItem("userProfile");
    if (token) {
      setIsAuth(true);
      const decoded = jwtDecode(JSON.stringify(token));
      setUser(decoded);
    }
    if (image) {
      setImage(image);
    }
  };
  const logout = () => {
    setIsAuth(false);
    sessionStorage.removeItem("userToken");
    alert("Амжилттай системээс гарлаа", "success");
  };

  const changeUserPhoto = async (photo) => {
    try {
      let formData = new FormData();
      formData.append("profile", photo);
      const { data } = await myAxios.put(
        `/api/users/profile/${user.ID}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
          },
        }
      );
      alert("Зураг амжилттай солигдлоо", "success");
      setImage(data.result);
      sessionStorage.setItem("userProfile", data.result);
    } catch (error) {
      alert("Зураг солиход алдаа гарлаа", "error");
    }
  };

  const checkOldPassword = async (Password) => {
    try {
      const { data } = await myAxios.post(
        "/api/users/checkPassword",
        {
          Password,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
          },
        }
      );
      console.log("response", data);
      return data.success;
    } catch (error) {
      if (!error.response) {
        alert("Уучлаарай, сүлжээ унасан байна", "error");
      } else {
        alert(error.response.data.error.message, "error");
      }
      return false;
    }
  };
  const changePassword = async (NewPassword, OldPassword) => {
    console.log(OldPassword, NewPassword);
    try {
      const { data } = await myAxios.post(
        "/api/users/changedPassword",
        {
          OldPassword,
          NewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
          },
        }
      );
      alert("Таны нууц үг амжилттай солигдлоо", "success");
      console.log("password changed", data);
    } catch (error) {
      console.log("Error in changin", error);
      if (!error.response) {
        alert("Уучлаарай, сүлжээ унасан байна", "error");
      } else {
        alert(error.response.data.error.message, "error");
      }
    }
  };

  const resetPassword = async (UserID) => {
    try {
      const { data } = await myAxios.post("/api/users/forget", { UserID });
      alert(data.result, "success");
    } catch (error) {
      console.log("Error resetPassword", error);
      if (!error.response) {
        alert("Уучлаарай, сүлжээ унасан байна", "error");
      } else {
        alert(error.response.data.error.message, "error");
      }
    }
  };

  useEffect(() => {
    checkIsLogged();
  }, []);

  return (
    <authContext.Provider
      value={{
        resetPassword,
        changeUserPhoto,
        handleCheckRegister,
        handleLogin,
        checkIsLogged,
        logout,
        checkOldPassword,
        changePassword,
        loading,
        user,
        isAuth,
        open,
        openDrawer,
        setOpenDrawer,
        setOpen,
        userImage,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => {
  return useContext(authContext);
};
