import { useEffect, useState } from "react";
import { add_card } from "../../assets";
import { CustomHeader, Loader } from "../../components";
import RuleCategoryCard from "../../components/RuleCategoryCard";
import "../../css/rule.css";
import RuleCategoryModal from "../../components/RuleCategoryModal";
import { useAuth } from "../../context/AuthProvider";
import { checkRole } from "../../lib/utils/checkRole";
import { useRule } from "../../context/RuleProvider";
import NewRules from "./NewRules";
const Rules = () => {
  const { user } = useAuth();
  const { getRulesCategory, rulesCategory, catError, loading } = useRule();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCategoryModal = (value) => {
    setIsModalOpen(value);
  };
  useEffect(() => {
    getRulesCategory();
  }, []);
  return (
    <>
      <CustomHeader title="Дүрэм журам" />
      <main className="rules-card-container">
        {loading ? (
          <Loader />
        ) : catError ? (
          ""
        ) : (
          rulesCategory?.map((rule) => {
            return (
              <RuleCategoryCard
                key={rule.ID}
                rule={rule}
                handleCategoryModal={handleCategoryModal}
              />
            );
          })
        )}

        {checkRole(user.Role) && (
          <div className="ruleCARD">
            <img
              src={add_card}
              onClick={() => {
                handleCategoryModal(true);
              }}
            />
          </div>
        )}
        {/* <NewRules /> */}
        <RuleCategoryModal
          open={isModalOpen}
          handleAddModal={handleCategoryModal}
        />
      </main>
    </>
  );
};

export default Rules;
