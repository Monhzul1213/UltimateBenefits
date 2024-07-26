import { RulesBod, RulesDj, RulesGa, RulesHut } from "../../assets";
import { CustomHeader } from "../../components";
import RuleCategoryCard from "../../components/RuleCategoryCard";
import "../../css/rule.css";

const Rules = () => {
  const data = [
    { title: "Дүрэм журам", image: RulesDj },
    { title: "Бодлого", image: RulesBod },
    { title: "Хөтөлбөр", image: RulesHut },
    { title: "Гарын авлага", image: RulesGa },
  ];
  return (
    <>
      <CustomHeader title="Дүрэм журам" />
      <main className="rules-card-container">
        {data.map((rule) => {
          return <RuleCategoryCard rule={rule} />;
        })}
      </main>
    </>
  );
};

export default Rules;
