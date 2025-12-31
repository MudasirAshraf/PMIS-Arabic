import React from "react";
import "./objectivecard.scss";

const ObjectiveCard = ({ title, value, onClick }) => {
  return (
    <div className="main-container-objective-card" onClick={onClick}>
      <p className="objective-para-i fw-700 fs-md lh-1">{title}</p>
      <p className="objective-para-ii fw-500 fs-l lh-1">{value}</p>
    </div>
  );
};

export default ObjectiveCard;
