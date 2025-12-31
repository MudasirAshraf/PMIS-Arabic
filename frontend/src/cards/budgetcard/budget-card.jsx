import React from "react";
import "./budgetcard.scss";

const BudgetCard = ({ image, title, value, theme, type, onClick }) => {
  return (
    <div className={`main-container-card-III ${type} ${theme}-theme`} onClick={onClick}>
      <img src={image} alt="logo" />
      <p className="title-card-iii fs-lg fw-500">{title}</p>
      <p className="value-card-iii fs-lg fw-300">{value}</p>
    </div>
  );
};


export default BudgetCard;
