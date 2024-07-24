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
  setOpenDrawer: () => {},
  setOpen: () => {},
  userPicture: {},
});
const AuthProvider = ({ children }) => {
  const [userPicture, setUserPicture] = useState();
  const [user, setUser] = useState();
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
    if (token) {
      setIsAuth(true);
      const decoded = jwtDecode(JSON.stringify(token));
      setUser(decoded);
      console.log("USER LOGGED IN", decoded);
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
      const data = myAxios.put(`/api/users/profile/${user.ID}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      });
      console.log("CHANGE PHOTE", data);
      alert("Зураг амжилттай солигдлоо");
    } catch (error) {
      console.log("error in changing photo", error);
    }
  };
  const getUserPicture = async () => {
    try {
      const { data } = await myAxios.get(
        "api/file/download/Image?filePath=C:/Users/nanza/Downloads/1.jpg",
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
          },
        }
      );
      setUserPicture(data);
      console.log("PICTURE", data);
    } catch (error) {
      console.log("ERROR IN GET PICTURE", error);
    }
  };

  useEffect(() => {
    checkIsLogged();
  }, []);

  useEffect(() => {
    if (user) {
      getUserPicture();
    }
  }, [user]);

  return (
    <authContext.Provider
      value={{
        userPicture,
        changeUserPhoto,
        handleCheckRegister,
        handleLogin,
        checkIsLogged,
        logout,
        loading,
        user,
        isAuth,
        open,
        openDrawer,
        setOpenDrawer,
        setOpen,
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
