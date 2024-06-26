import { createContext, useContext, useEffect, useState } from "react";
import { checkRegister, login } from "../../lib/actions/user.actions";
import { alert } from "../../lib/actions/alert.actions";
import { jwtDecode } from "jwt-decode";

export const authContext = createContext({
  handleCheckRegister: () => {},
  handleLogin: () => {},
  logout: () => {},
  loading: false,
  user: null,
  isAuth: false,
  open: false,
  openDrawer: false,
  setOpenDrawer: () => {},
  setOpen: () => {},
});
const AuthProviver = ({ children }) => {
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
      const isLogged = await login(register, pin);
      isLogged && checkIsLogged();
      setOpen(false);
    } else {
      alert("Нууц үг дутуу байна", "error");
    }
  };

  const checkIsLogged = () => {
    const token = sessionStorage.getItem("userToken");
    if (token) {
      setIsAuth(true);
      const decoded = jwtDecode(JSON.stringify(token));
      console.log("USER", decoded);
      setUser(decoded);
    }
  };
  const logout = () => {
    setIsAuth(false);
    sessionStorage.removeItem("userToken");
    alert("Амжилттай системээс гарлаа", "success");
  };

  useEffect(() => {
    checkIsLogged();
  }, []);

  return (
    <authContext.Provider
      value={{
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

export default AuthProviver;
export const useAuth = () => {
  return useContext(authContext);
};
