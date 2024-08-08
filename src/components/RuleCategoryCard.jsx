import { Dropdown } from "antd";
import { checkRole } from "../lib/utils/checkRole";
import { useAuth } from "../context/AuthProvider";
import { useRule } from "../context/RuleProvider";
import Swal from "sweetalert2";

const RuleCategoryCard = ({ rule, handleCategoryModal }) => {
  const { user } = useAuth();
  const { setIsEdit, handleCategoryForm, deleteRuleCategory } = useRule();
  const handleEditCat = () => {
    handleCategoryModal(true);
    setIsEdit(true);
    console.log(rule.Name);
    handleCategoryForm("Name", rule.Name);
    handleCategoryForm("ID", rule.ID);
  };
  const handleDelete = () => {
    Swal.fire({
      title: "Та уг үйлдлийг хийхдээ итгэлтэй байна уу?",
      text: "Уг категориг устгаснаар доторх бүх файл болон мэдээллүүд устах болно",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Үгүй",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Тийм",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRuleCategory(rule.ID);
      }
    });
  };
  const items = [
    {
      label: "Дэлгэрэнгүй нэмэх",
      key: "1",
    },
    {
      label: "Засах",
      key: "2",
      onClick: handleEditCat,
    },
    {
      label: "Устгах",
      key: "3",
      danger: true,
      onClick: handleDelete,
    },
  ];
  return (
    <Dropdown
      menu={checkRole(user?.Role) ? { items } : {}}
      trigger={["contextMenu"]}
    >
      <div className="rule-category-card">
        <img src={"data:image/jpeg;base64," + rule.Image} alt="icon..." />
        <h3>{rule.Name}</h3>
      </div>
    </Dropdown>
  );
};

export default RuleCategoryCard;
