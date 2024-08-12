import { Dropdown } from "antd";
import { checkRole } from "../lib/utils/checkRole";
import { useAuth } from "../context/AuthProvider";
import { useRule } from "../context/RuleProvider";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const RuleCategoryCard = ({ rule, handleCategoryModal }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setIsEdit, handleCategoryForm, deleteRuleCategory } = useRule();
  const handleEditCat = () => {
    handleCategoryModal(true);
    setIsEdit(true);

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
      label: "Засах",
      key: "1",
      onClick: handleEditCat,
    },
    {
      label: "Устгах",
      key: "2",
      danger: true,
      onClick: handleDelete,
    },
  ];
  return (
    <Dropdown
      menu={
        checkRole(user?.Role)
          ? { items }
          : {
              items: [
                {
                  label: "Дэлгэрэнгүй",
                  key: "1",
                  onClick: () => {
                    navigate(`/rules/${rule.ID}`);
                  },
                },
              ],
            }
      }
      trigger={["contextMenu"]}
    >
      <Link to={`/rules/${rule.ID}`}>
        <div className="rule-category-card">
          <img src={"data:image/jpeg;base64," + rule.Image} alt="icon..." />
          <h3>{rule.Name}</h3>
        </div>
      </Link>
    </Dropdown>
  );
};

export default RuleCategoryCard;
