import { createContext, useContext, useEffect, useState } from "react";
import { checkRegister, login } from "../../lib/actions/user.actions";
import { alert } from "../../lib/actions/alert.actions";
import { jwtDecode } from "jwt-decode";

export const authContext = createContext({
  handleCheckRegister: () => {},
  handleLogin: () => {},
  loading: false,
  user: null,
  isAuth: false,
  open: false,
  setOpen: () => {},
});
const AuthProviver = ({ children }) => {
  const [user, setUser] = useState();
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

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
    const token = localStorage.getItem("userToken");
    if (token) {
      const decoded = jwtDecode(JSON.stringify(token));
      console.log("USER", decoded);
      setIsAuth(true);
      setUser(decoded);
    }
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
        loading,
        user,
        isAuth,
        open,
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
