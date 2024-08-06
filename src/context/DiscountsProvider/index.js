import { createContext, useContext, useEffect, useState } from "react";
import myAxios from "../../lib/axios";
import { useAuth } from "../AuthProvider";
import { alert } from "../../lib/actions/alert.actions";

export const DiscountsContext = createContext({
  discounts: [],
  discountsLoading: false,
  discountsFailed: false,
  discountsForm: {},
  discountsFormEdit: {},
  addDiscounts: () => {},
  getDiscounts: () => {},
  editDiscounts: () => {},
  deleteDiscounts: () => {},
  handleDiscountsForm: () => {},
  setDiscountsFormEdit: () => {},
});

const DiscountsProvider = ({ children }) => {
  const { user } = useAuth();
  const [discounts, setDiscounts] = useState([]);
  const [discountsLoading, setDiscountsLoading] = useState(false);
  const [discountsFailed, setDiscountsFailed] = useState(false);
  const [discountsForm, setDiscountsForm] = useState({
    Name: "",
    Descr: "",
    Type: "",
    AvailableCount: "",
    Image: "null",
  });
  const [discountsFormEdit, setDiscountsFormEdit] = useState({
    Name: "",
    Descr: "",
    Type: "",
    AvailableCount: "",
    Image: "null",
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
      const {data} = await myAxios.get("/api/discount", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      });
      //console.log("DATA", data.result);
      setDiscounts(data.result || []);
      setDiscountsFailed(false);
    } catch (error) {
      setDiscountsFailed(true);
    } finally {
      setDiscountsLoading(false);
    }
  };

  const addDiscounts = async (data) => {
    console.log("data", data)
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    try {
      await myAxios.post("/api/discount", formData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      });
      alert("Хөнгөлөлт, урамшуулал амжилттай нэмэгдлээ", "success");
      getDiscounts();
    } catch (error) {
      console.log("error", error)
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
      await myAxios.put(`/api/discount/${id}`, discountsFormEdit, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      });
      alert("Амжилттай өөрчлөгдлөө", "success");
      getDiscounts();
    } catch (error) {
      console.log("EditError", error)
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
      console.log("deleteError", error)
      alert(error.response ? error.response.data.error.message : "Уучлаарай, сүлжээ унасан байна", "error");
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
        discounts,
        discountsLoading,
        discountsFailed,
        discountsForm,
        discountsFormEdit,
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
export const useDiscounts = () =>{
  return  useContext(DiscountsContext);
};
