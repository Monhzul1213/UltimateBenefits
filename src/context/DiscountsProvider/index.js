import {createContext, useContext, useEffect, useState} from "react";
import myAxios from "../../lib/axios";
import { useAuth } from "../AuthProvider";
import { alert } from "../../lib/actions/alert.actions";

export const DiscountsContext = createContext({
    discounts: [],
    discountsLoading: false,
    discountsFailed: false,
    discountsForm:{},
    discountsFormEdit: {},
    addDiscounts: () => {},
    getDiscounts: () => {},
    editDiscounts: () => {},
    deleteDiscounts: () => {},
    handleDiscountsForm: () => {},
    setDiscountsFormEdit: () => {},
})
const DiscountsProvider = ({ children }) => {
    const { user } = useAuth();
    const [Discounts, setDiscounts] = useState([]);
    const [DiscountsLoading, setDiscountsLoading] = useState(false);
    const [DiscountsFailed, setDiscountsFailed] = useState(false);
    const [DiscountsForm, setDiscountsForm] = useState({
      Name: "",
      Descr: "",
      Type: "",
      AvailableCount: "",
      Image: "",
    });
    const [DiscountsFormEdit, setDiscountsFormEdit] = useState({
      Title: "",
      Name:"",
      Descr: "",
      Type: "",
      AvailableCount: "",
      Image: "",
    });
  
    const handleDiscountsForm = (name, value) => {
      setDiscountsFormEdit((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const getDiscounts = async () => {
      setDiscountsLoading(true);
      try {
        const { data } = await myAxios.get("/api/discount", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
          },
        });
        setDiscounts(data.discounts);
        setDiscountsFailed(false);
      } catch (error) {
        setDiscountsFailed(true);
      } finally {
        setDiscountsLoading(false);
      }
    };
  
    const addDiscounts = async () => {
      try {
        await myAxios.post("/api/discount", Discounts, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
          },
        });
        alert("Хөнгөлөлт, урамшуулал амжилттай нэмэгдлээ", "success");
        getDiscounts();
      } catch (error) {
        if (!error.response) {
          alert("Уучлаарай, сүлжээ унасан байна", "error");
        } else {
          alert(error.response.data.error.message, "error");
        }
      }
    };
  
    const editDiscounts = async (id) => {
      setDiscountsLoading(true);
      try {
        await myAxios.put(`/api/discount/${id}`, DiscountsFormEdit, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
          },
        });
        alert("Амжилттай өөрчлөгдлөө", "success");
        getDiscounts();
      } catch (error) {
        if (!error.response) {
          alert("Уучлаарай, сүлжээ унасан байна", "error");
        } else {
          alert(error.response.data.error.message, "error");
        }
      } finally {
        setDiscountsLoading(false);
      }
    };
  
    const deleteDiscounts = async (id) => {
      setDiscountsLoading(true);
      try {
        await myAxios.delete(`/api/discount/${id}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
          },
        });
        alert("Хөнгөлөлт, урамшуулал амжилттай устгагдлаа", "success");
        getDiscounts();
      } catch (error) {
        if (!error.response) {
          alert("Уучлаарай, сүлжээ унасан байна", "error");
        } else {
          alert(error.response.data.error.message, "error");
        }
      } finally {
        setDiscountsLoading(false);
      }
    };
  
    useEffect(() => {
      if (user) {
        getDiscounts();
      }
    }, [user]);
  
    return (
      <DiscountsContext.Provider
        value={{
            Discounts,
            DiscountsLoading,
            DiscountsFailed,
            DiscountsForm,
            DiscountsFormEdit,
          addDiscounts,
          getDiscounts,
          editDiscounts,
          deleteDiscounts,
          handleDiscountsForm,
          setDiscountsFormEdit,
        }}
      >
        {children}
      </DiscountsContext.Provider>
    );
  };
  
  export default DiscountsProvider;
  
  export const useDiscounts = () => {
    return useContext(DiscountsContext);
  };
  