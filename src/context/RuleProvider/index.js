import { createContext, useContext, useState } from "react";
import myAxios from "../../lib/axios";
import { alert } from "../../lib/actions/alert.actions";

const ruleContext = createContext({
  rulesCategory: [],
  loading: false,
  catError: false,
  isEdit: false,
  setIsEdit: () => {},
  getRulesCategory: () => {},
  createRuleCategory: () => {},
  deleteRuleCategory: () => {},
  editRuleCategory: () => {},
  ruleCategoryForm: {},
  handleCategoryForm: () => {},
  clearCategoryForm: () => {},
});

const RuleProvider = ({ children }) => {
  const [rulesCategory, setRulesCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [catError, setError] = useState(false);
  //GET RULES CATORY
  const getRulesCategory = async () => {
    setLoading(true);
    try {
      const { data } = await myAxios.get("/api/rules/category", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      });
      console.log(data);
      setRulesCategory(data.result);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  //CREATE RULE CATEGORY
  const [ruleCategoryForm, setRuleCategoryForm] = useState({
    Name: "",
    Image: "",
    ID: "",
  });
  const handleCategoryForm = (name, value) => {
    setRuleCategoryForm((prev) => ({ ...prev, [name]: value }));
  };
  const clearCategoryForm = () => {
    setRuleCategoryForm({
      Name: "",
      Image: "",
    });
    setIsEdit(false);
  };
  const createRuleCategory = async () => {
    const formData = new FormData();
    console.log("ADDING RULE", ruleCategoryForm);
    formData.append("Name", ruleCategoryForm.Name);
    formData.append("Image", ruleCategoryForm.Image);
    try {
      await myAxios.post("/api/rules/category", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      });
      alert("Амжилттай нэмэгдлээ", "success");
      getRulesCategory();
    } catch (error) {
      console.log(error);
      alert("Алдаа гарлаа", "error");
    }
  };
  //CATEGORY EDIT
  const [isEdit, setIsEdit] = useState(false);
  const editRuleCategory = async () => {
    const formData = new FormData();
    console.log("ADDING RULE", ruleCategoryForm);
    formData.append("Name", ruleCategoryForm.Name);
    formData.append("Image", ruleCategoryForm.Image);
    try {
      await myAxios.put(
        "/api/rules/category/" + ruleCategoryForm.ID,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
          },
        }
      );
      alert("Амжилттай нэмэгдлээ", "success");
      getRulesCategory();
    } catch (error) {
      console.log(error);
      alert("Алдаа гарлаа", "error");
    }
  };
  //CATEGORY DELETE
  const deleteRuleCategory = async (id) => {
    try {
      await myAxios.delete("/api/rules/category/" + id, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      });
      alert("Амжилттай устгагдлаа", "success");
      getRulesCategory();
    } catch (error) {
      alert("Алдаа гарлаа", "error");
    }
  };
  return (
    <ruleContext.Provider
      value={{
        rulesCategory,
        loading,
        catError,
        isEdit,
        setIsEdit,
        getRulesCategory,
        createRuleCategory,
        deleteRuleCategory,
        editRuleCategory,
        ruleCategoryForm,
        handleCategoryForm,
        clearCategoryForm,
      }}
    >
      {children}
    </ruleContext.Provider>
  );
};
export default RuleProvider;

export const useRule = () => {
  return useContext(ruleContext);
};
