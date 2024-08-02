const RuleCategoryCard = ({ rule }) => {
  return (
    <div className="rule-category-card">
      <img src={rule.image} alt="" />
      <h3>{rule.title}</h3>
    </div>
  );
};

export default RuleCategoryCard;
