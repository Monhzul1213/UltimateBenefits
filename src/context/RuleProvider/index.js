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
  createRuleDetail: () => {},
  handleRuleDetailForm: () => {},
  ruleDetailForm: {},
  editDetail: false,
  getRuleDetail: false,
  setEditDetail: () => {},
  clearDetailForm: () => {},
  deleteRuleDetail: () => {},
  editRuleDetail: () => {},
  setRuleDetailForm: () => {},
  setGetRuleDetail: () => {},
});

const RuleProvider = ({ children }) => {
  const [rulesCategory, setRulesCategory] = useState([]);
  const [loading, setLoading] = useState(true);
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
      setError(false);
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
  //RULE DETAIL
  const [getRuleDetail, setGetRuleDetail] = useState(false);
  const [ruleDetailForm, setRuleDetailForm] = useState({
    Name: "",
    IsFile: "N",
    FileDesc: "",
  });
  const [editDetail, setEditDetail] = useState(false);
  const handleRuleDetailForm = (name, value) => {
    setRuleDetailForm((prev) => ({ ...prev, [name]: value }));
  };
  const clearDetailForm = () => {
    setRuleDetailForm({
      Name: "",
      IsFile: "",
      FileDesc: "",
    });
    setEditDetail(false);
  };
  const createRuleDetail = async (categoryId) => {
    console.log(ruleDetailForm);
    const formData = new FormData();
    formData.append("Name", ruleDetailForm.Name);
    formData.append("IsFile", ruleDetailForm.IsFile);
    formData.append("FileDesc", ruleDetailForm.FileDesc);
    formData.append("CategoryID", categoryId);
    try {
      await myAxios.post("/api/rules", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      });
      alert("Амжилттай нэмэгдлээ", "success");
      setGetRuleDetail(!getRuleDetail);
    } catch (error) {
      console.log("error", error);
      alert("Алдаа гарлаа", "error");
    }
  };
  //EDIT RULE DETAIL
  const editRuleDetail = async (id) => {
    console.log(ruleDetailForm);
    const formData = new FormData();
    formData.append("Name", ruleDetailForm.Name);
    formData.append("IsFile", ruleDetailForm.IsFile);
    formData.append("FileDesc", ruleDetailForm.FileDesc);
    try {
      await myAxios.put("/api/rules/" + id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      });
      alert("Амжилттай засагдлаа", "success");
      setGetRuleDetail(!getRuleDetail);
    } catch (error) {
      console.log("error", error);
      alert("Алдаа гарлаа", "error");
    }
  };
  //DELETE RULE DETAIL
  const deleteRuleDetail = async (id) => {
    try {
      await myAxios.delete("/api/rules/" + id, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      });
      alert("Амжилттай устгагдлаа", "success");
      setGetRuleDetail(!getRuleDetail);
    } catch (error) {
      console.log("error", error);
      alert("Алдаа гарлаа", "error");
    }
  };
  return (
    <ruleContext.Provider
      value={{
        setGetRuleDetail,
        deleteRuleDetail,
        editRuleDetail,
        clearDetailForm,
        createRuleDetail,
        handleRuleDetailForm,
        ruleDetailForm,
        getRuleDetail,
        editDetail,
        setEditDetail,
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
        setRuleDetailForm,
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
